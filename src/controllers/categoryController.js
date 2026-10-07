const Category = require("../models/Category");

const getCategories = async (req, res) => {
  const categories = await Category.find().select("_id slug name subtitle");
  res.status(200).json(categories);
};

module.exports = { getCategories };
