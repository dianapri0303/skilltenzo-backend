const mongoose = require("mongoose");
const User = require("../models/User");
const Course = require("../models/Course");
const Order = require("../models/Order");

const createOrder = async (req, res) => {
  const { name, email, cardNumber, expiry, cvc } = req.body;

  if (!name || !email || !cardNumber || !expiry || !cvc) {
    return res.status(400).json({ message: "Missing payment details" });
  }

  const user = await User.findById(req.user._id).populate("cart");

  if (user.cart.length === 0) {
    return res.status(402).json({ message: "Your cart is empty" });
  }

  const alreadyOwnedIds = user.enrollments.map((e) => e.course.toString());
  const hasOwnedCourse = user.cart.some((course) =>
    alreadyOwnedIds.includes(course._id.toString()),
  );

  if (hasOwnedCourse) {
    return res
      .status(402)
      .json({ message: "One of the courses is already purchased" });
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const items = user.cart.map((course) => ({
      course: course._id,
      title: course.title,
      priceAtPurchase: course.price,
    }));

    const totalAmount = items.reduce(
      (sum, item) => sum + item.priceAtPurchase,
      0,
    );

    const order = await Order.create([{ user: user._id, items, totalAmount }], {
      session,
    });

    user.cart.forEach((course) => {
      user.enrollments.push({ course: course._id, status: "in_progress" });
    });
    user.cart = [];

    await user.save({ session });

    await Course.updateMany(
      { _id: { $in: items.map((i) => i.course) } },
      { $inc: { studentsCount: 1 } },
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      orderId: order[0]._id,
      enrolledCourses: items.map((i) => i.course),
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(402).json({ message: "Payment failed. Please try again" });
  }
};

const getMyLearning = async (req, res) => {
  const user = await User.findById(req.user._id).populate(
    "enrollments.course",
    "title instructor coverImageUrl slug",
  );

  const inProgressCount = user.enrollments.filter(
    (e) => e.status === "in_progress",
  ).length;
  const completedCount = user.enrollments.filter(
    (e) => e.status === "completed",
  ).length;

  res.status(200).json({
    enrollments: user.enrollments,
    inProgressCount,
    completedCount,
  });
};

const completeCourse = async (req, res) => {
  const { courseId } = req.params;

  const user = await User.findById(req.user._id);

  const enrollment = user.enrollments.find(
    (e) => e.course.toString() === courseId,
  );

  if (!enrollment) {
    return res.status(404).json({ message: "Course not found in enrollments" });
  }

  if (enrollment.status === "completed") {
    return res.status(409).json({ message: "Course already completed" });
  }

  enrollment.status = "completed";
  enrollment.completedAt = new Date();

  await user.save();

  res.status(200).json({ enrollment });
};

module.exports = { createOrder, getMyLearning, completeCourse };
