const mongoose = require("mongoose");

const packageType = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    packages: {
      type: [mongoose.Types.ObjectId],
      ref: "Packages",
    },
    image: [String],
    description: String,

    subscriptionType: {
      type: [String],
    },
    slug: String,
    status: Boolean,
    isActive: {
      type: Boolean,
      default: true,
    },
  },

  { timestamps: true }
);
module.exports = mongoose.model("packageType", packageType);
