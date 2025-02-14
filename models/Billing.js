const mongoose = require("mongoose");

const Billing = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    Country: {
      type: String,
    },
    streetAddress: {
      type: String,
    },
    phone: {
      type: mongoose.Types.Decimal128,
    },
    email: {
      type: String,
    },
    status: { type: Boolean, default: true },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Billing", Billing);
