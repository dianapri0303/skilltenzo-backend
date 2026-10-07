require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Category = require("../models/Category");
const Course = require("../models/Course");

const categoriesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "categories.json"), "utf-8"),
);
const coursesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "courses.json"), "utf-8"),
);

const importData = async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  await Category.deleteMany();
  await Course.deleteMany();

  const formattedCategories = categoriesData.map((cat) => ({
    _id: cat._id.$oid,
    name: cat.name,
    slug: cat.slug,
    subtitle: cat.subtitle,
  }));
  await Category.insertMany(formattedCategories);

  const formattedCourses = coursesData.map((course) => ({
    _id: course._id.$oid,
    slug: course.slug,
    title: course.title,
    shortDescription: course.shortDescription,
    coverImageUrl: course.coverImageUrl,
    category: course.category.$oid,
    level: course.level,
    language: course.language,
    durationMinutes: course.durationMinutes,
    price: course.price,
    instructor: course.instructor,
    whatYoullLearn: course.whatYoullLearn,
    ratingAverage: course.ratingAverage,
    studentsCount: course.studentsCount,
  }));
  await Course.insertMany(formattedCourses);

  console.log("Categories and courses imported successfully");
  process.exit();
};

importData();
