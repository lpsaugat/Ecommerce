const { Timestamp } = require("mongodb");
const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var Product = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: false,
    },
    Price: {
      type: Number,
      required: true,
    },
    Priceper: {
      type: String,
      required: false,
      default: "",
    },

    Quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    Image: {
      type: String,
      required: true,
    },
    Status: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    Category: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", Product);
