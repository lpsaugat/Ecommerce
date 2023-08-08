const mongoose = require("mongoose");

const offer = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    discount: {
      type: mongoose.Types.Decimal128,
    },
    decription: {
      type: String,
    },
    valid_from: {
      type: Date,
      required: [true, "Please provide valid from date"],
    },
    valid_to: {
      type: Date,
      required: [true, "Please provide valid to date"],
    },
    image: String,
    code: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("offer", offer);
