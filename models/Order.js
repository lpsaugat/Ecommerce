const mongoose = require("mongoose");

const Order = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    productID: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },

    vendor: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
    price: {
      type: Number,
    },
    quantity: Number,
    name: String,
    image: String,
    priceper: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", Order);
