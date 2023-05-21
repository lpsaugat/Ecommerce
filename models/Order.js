const mongoose = require("mongoose");

const Order = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    productID: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
    vendor: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    price: {
      type: mongoose.Types.Decimal128,
    },
    quantity: mongoose.Types.Decimal128,
    name: String,
    status: { type: Boolean, default: true },
    orderStatus: { type: String, enum: ["paid", "unpaid", "cancelled"] },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", Order);
