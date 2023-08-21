const mongoose = require("mongoose");

const delivery = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    delivery: {
      type: String,
    },
    type: {
      type: String,
    },
    price: mongoose.Types.Decimal128,
    location: String,
    status: Boolean,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("delivery", delivery);
