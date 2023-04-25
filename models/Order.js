const mongoose = require("mongoose");

var Order = new mongoose.Schema(
  {
    User: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    ProductID: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
    Vendor: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
    Price: {
      type: Number,
    },
    quantity: Number,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", Order);
