const mongoose = require("mongoose");

const Shipping = new mongoose.Schema(
  {
    cart: {
      type: mongoose.Types.ObjectId,
      ref: "Cart",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    paymentMethod: {
      type: String,
      ref: "PaymentMethod",
    },
    deliveryStatus: {
      type: String,
      // ref: "DeliveryStatus",
    },
    charge: {
      type: mongoose.Types.Decimal128,
    },
    netTotal: {
      type: mongoose.Types.Decimal128,
    },
    status: Boolean,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Shipping", Shipping);
