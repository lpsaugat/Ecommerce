const mongoose = require("mongoose");

const Packages = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    productID: {
      type: [mongoose.Types.ObjectId],
      ref: "Product",
    },
    price: {
      type: Number,
    },
    quantity: Number,
    image: [String],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Packages", Packages);
