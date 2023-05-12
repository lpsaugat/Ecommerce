const { Timestamp } = require("mongodb");
const mongoose = require("mongoose"); // Erase if already required
const Categories = require("./Categories");

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
    price: {
      type: Number,
      required: true,
    },
    priceper: {
      type: String,
      required: false,
      default: "",
    },

    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    image: {
      type: [String],
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: [mongoose.Types.ObjectId],
      required: false,
      ref: "Categories",
    },
    subscriptionType: {
      type: [String],
      enum: ["Gold", "Platinum", "Silver"],
    },
    fieldFilter: {
      type: [String],
      enum: ["Best", "Featured", "ForYou", "Popular"],
    },
    rating: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", Product);
