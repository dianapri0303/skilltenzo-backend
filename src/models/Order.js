const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
        title: String,
        priceAtPurchase: Number,
      },
    ],
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
