const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    coverImageUrl: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    level: { type: String, required: true },
    language: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    price: { type: Number, required: true },
    instructor: {
      name: { type: String, required: true },
      avatarUrl: { type: String, required: true },
      bio: { type: String, required: true },
    },
    whatYoullLearn: [{ type: String }],
    ratingAverage: { type: Number, default: 0 },
    studentsCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Course", courseSchema);
