const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 60,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    enrollments: [
      {
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
        status: {
          type: String,
          enum: ["in_progress", "completed"],
          default: "in_progress",
        },
        completedAt: {
          type: Date,
          default: null,
        },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
