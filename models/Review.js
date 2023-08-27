const mongoose = require("mongoose");

const Review = new mongoose.Schema(
  {
    comment: {
      type: String,
    },
    rating: {
      type: Number,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    productID: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
    packageID: {
      type: mongoose.Types.ObjectId,
      ref: "Package",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Review", Review);
