const mongoose = require("mongoose");

const role = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("role", role);
