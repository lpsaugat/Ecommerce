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
    discount: Number,
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
  },
  { timestamps: true }
);
module.exports = mongoose.model("Packages", Packages);
