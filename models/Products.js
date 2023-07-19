const { Timestamp, Decimal128 } = require("mongodb");
const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var Product = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    longDescription: {
      type: String,
    },
    discountedPrice: {
      type: mongoose.Types.Decimal128,
      required: false,
    },
    price: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
    measure: {
      type: String,
      required: false,
      default: "Full Quantity",
    },

    quantity: {
      type: mongoose.Types.Decimal128,
      required: true,
      default: 1,
    },
    image: {
      type: [String],
      required: true,
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: [String],
      required: false,
      ref: "Categories",
    },

    slug: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
    averageRating: {
      type: mongoose.Types.Decimal128,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", Product);
