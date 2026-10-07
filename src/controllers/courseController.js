const Course = require("../models/Course");
const Category = require("../models/Category");

const getCourses = async (req, res) => {
  const { category, search, sort, page = 1, limit = 12 } = req.query;

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  if (pageNum <= 0 || limitNum <= 0) {
    return res.status(400).json({ message: "Invalid page or limit" });
  }

  const filter = {};

  if (category) {
    const categoryDoc = await Category.findOne({ slug: category });
    if (!categoryDoc) {
      return res.status(400).json({ message: "Invalid category" });
    }
    filter.category = categoryDoc._id;
  }

  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  const sortOptions = {
    studentsCount: { studentsCount: -1 },
    ratingAverage: { ratingAverage: -1 },
    price_asc: { price: 1 },
    price_desc: { price: -1 },
  };

  const sortBy = sortOptions[sort] || {};

  const total = await Course.countDocuments(filter);
  const totalPages = Math.ceil(total / limitNum);

  const courses = await Course.find(filter)
    .sort(sortBy)
    .skip((pageNum - 1) * limitNum)
    .limit(limitNum);

  res.status(200).json({ courses, total, page: pageNum, totalPages });
};

const getTrendingCourses = async (req, res) => {
  const courses = await Course.find().sort({ studentsCount: -1 }).limit(6);

  res.status(200).json(courses);
};

const getCourseBySlug = async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug }).populate(
    "category",
    "name slug",
  );

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  res.status(200).json(course);
};

module.exports = { getCourses, getTrendingCourses, getCourseBySlug };
