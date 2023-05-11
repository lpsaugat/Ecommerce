const mongoose = require("mongoose");

const Packages = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    products: {
      type: [mongoose.Types.ObjectId],
      ref: "Product",
    },
    price: {
      type: Number,
    },
    quantity: Number,
    image: [String],
    description: String,
    fieldFilter: {
      type: [String],
      enum: ["Best", "Featured", "ForYou", "Popular"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Packages", Packages);
