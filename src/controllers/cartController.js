const User = require("../models/User");
const Course = require("../models/Course");

const getCart = async (req, res) => {
  const user = await User.findById(req.user._id).populate(
    "cart",
    "title price coverImageUrl instructor slug",
  );

  const totalAmount = user.cart.reduce((sum, course) => sum + course.price, 0);

  res.status(200).json({ cart: user.cart, totalAmount });
};

const addToCart = async (req, res) => {
  const { courseId } = req.params;

  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  const user = await User.findById(req.user._id);

  const alreadyOwned = user.enrollments.some(
    (e) => e.course.toString() === courseId,
  );
  if (alreadyOwned) {
    return res.status(409).json({ message: "Course already purchased" });
  }

  const alreadyInCart = user.cart.some((id) => id.toString() === courseId);
  if (alreadyInCart) {
    return res.status(409).json({ message: "Course already in cart" });
  }

  user.cart.push(courseId);
  await user.save();

  res.status(200).json({ cartCount: user.cart.length });
};

const removeFromCart = async (req, res) => {
  const { courseId } = req.params;

  const user = await User.findById(req.user._id);

  const wasInCart = user.cart.some((id) => id.toString() === courseId);
  if (!wasInCart) {
    return res.status(404).json({ message: "Course not found in cart" });
  }

  user.cart = user.cart.filter((id) => id.toString() !== courseId);
  await user.save();

  res.status(200).json({ cart: user.cart });
};

module.exports = { getCart, addToCart, removeFromCart };
