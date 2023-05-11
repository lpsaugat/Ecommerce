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
    homepageStatus: {
      type: Boolean,
      default: true,
    },
    offer: String,
    discount: Number,
    subscriptionType: {
      type: [String],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("packageType", packageType);
