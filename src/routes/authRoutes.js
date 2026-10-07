const express = require("express");
const {
  register,
  login,
  logout,
  refreshSession,
} = require("../controllers/authController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", auth, logout);
router.get("/refresh/session", auth, refreshSession);

module.exports = router;
