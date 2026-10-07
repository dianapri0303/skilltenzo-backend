require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Category = require("../models/Category");

const categoriesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "categories.json"), "utf-8"),
);

const importData = async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  await Category.deleteMany();

  const formatted = categoriesData.map((cat) => ({
    _id: cat._id.$oid,
    name: cat.name,
    slug: cat.slug,
    subtitle: cat.subtitle,
  }));
  await Category.insertMany(formatted);

  console.log("Categories imported successfully");
  process.exit();
};

importData();
