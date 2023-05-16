const mongoose = require("mongoose");

const permission = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    permission: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("permission", permission);
