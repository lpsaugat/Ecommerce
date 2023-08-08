const mongoose = require("mongoose");

const delivery = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    delivery: {
      type: String,
    },
    type: {
      type: String,
    },
    productID: {
      type: [mongoose.Types.ObjectId],
      ref: "Product",
    },
    packageID: {
      type: [mongoose.Types.ObjectId],
      ref: "Package",
    },
    status: Boolean,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("delivery", delivery);
