const express = require("express");
const {
  getCart,
  addToCart,
  removeFromCart,
} = require("../controllers/cartController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, getCart);
router.post("/:courseId", auth, addToCart);
router.delete("/:courseId", auth, removeFromCart);

module.exports = router;
