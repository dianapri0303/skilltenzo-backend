const express = require("express");
const {
  getCourses,
  getTrendingCourses,
  getCourseBySlug,
} = require("../controllers/courseController");

const router = express.Router();

router.get("/trending", getTrendingCourses);
router.get("/:slug", getCourseBySlug);
router.get("/", getCourses);

module.exports = router;
