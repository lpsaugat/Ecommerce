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
  },
  { timestamps: true }
);
module.exports = mongoose.model("permission", permission);
