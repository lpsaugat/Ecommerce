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
    discount: Number,
    offer: String,

    fieldFilter: {
      type: [String],
      enum: ["Best", "Featured", "ForYou", "Popular"],
    },
    category: {
      type: [String],
      ref: "Categories",
    },
    subscriptionType: {
      type: [String],
      enum: ["Gold", "Silver", "Platinum"],
    },
    FamilySize: {
      type: Number,
    },
    rating: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Packages", Packages);
