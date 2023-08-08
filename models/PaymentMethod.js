const mongoose = require("mongoose");

const PaymentMethod = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    type: {
      type: String,
    },
    productID: {
      type: [mongoose.Types.ObjectId],
      ref: "Product",
    },
    packageID: {
      type: [mongoose.Types.ObjectId],
      ref: "Package",
    },
    status: Boolean,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("PaymentMethod", PaymentMethod);
