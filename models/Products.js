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
    discountedFrom: {
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

      validate: {
        validator: function (value) {
          return value > -1;
        },
        message: "Quantity must be greater than -1.",
      },
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
    delivery: {
      type: mongoose.Types.ObjectId,
      ref: "delivery",
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
    soldQuantity: {
      type: mongoose.Types.Decimal128,
    },
    soldAmount: {
      type: mongoose.Types.Decimal128,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", Product);
