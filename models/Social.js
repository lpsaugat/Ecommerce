const mongoose = require("mongoose");

const Social = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    link: {
      type: String,
    },
    status: {
      type: Boolean,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Social", Social);
