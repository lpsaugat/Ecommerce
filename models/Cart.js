const mongoose = require("mongoose");

const Cart = new mongoose.Schema(
  {
    orders: {
      type: [mongoose.Types.ObjectId],
      ref: "Order",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    total: {
      type: mongoose.Types.Decimal128,
    },
    status: { type: Boolean, default: true },
    orderStatus: {
      type: String,
      enum: ["paid", "unpaid", "cancelled", "confirmed"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Cart", Cart);
