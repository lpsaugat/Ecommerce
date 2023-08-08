const mongoose = require("mongoose");

const role = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    role: {
      type: String,
    },
    permission: { type: [mongoose.Types.ObjectId], ref: "Permission" },
    status: Boolean,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("role", role);
