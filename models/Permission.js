const mongoose = require("mongoose");

const permission = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    permission: {
      type: String,
    },
    status: Boolean,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("permission", permission);
