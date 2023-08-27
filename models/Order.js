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
    orderStatus: {
      type: String,
      enum: ["ontheway", "cancelled", "confirmed", "delivered", "placed"],
      default: "placed",
    },
    status: { type: Boolean, default: true },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", Order);
