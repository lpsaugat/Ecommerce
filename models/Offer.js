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
    },
    valid_to: {
      type: Date,
    },
    image: String,
    code: {
      type: String,
    },
    status: Boolean,
  },
  { timestamps: true }
);
module.exports = mongoose.model("offer", offer);
