const mongoose = require("mongoose");

const role = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    role: {
      type: String,
    },
    permission: { type: mongoose.Types.ObjectId, ref: "Permission" },
    status: Boolean,
  },
  { timestamps: true }
);
module.exports = mongoose.model("role", role);
