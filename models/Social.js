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
  },
  { timestamps: true }
);
module.exports = mongoose.model("Social", Social);
