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
  },
  { timestamps: true }
);
module.exports = mongoose.model("delivery", delivery);
