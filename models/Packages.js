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
      type: mongoose.Types.Decimal128,
    },
    description: String,
    quantity: mongoose.Types.Decimal128,
    image: [String],
    longDescription: String,
    discountedFrom: mongoose.Types.Decimal128,
    offer: { type: mongoose.Types.ObjectId },
    category: {
      type: [String],
      ref: "Categories",
    },
    FamilySize: {
      type: Number,
    },
    slug: String,
    status: Boolean,
    averageRating: {
      type: mongoose.Types.Decimal128,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Packages", Packages);
