const express = require("express");
const {
  getMyLearning,
  completeCourse,
} = require("../controllers/orderController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, getMyLearning);
router.patch("/:courseId/complete", auth, completeCourse);

module.exports = router;
