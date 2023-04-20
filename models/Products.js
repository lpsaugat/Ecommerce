const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var Product = new mongoose.Schema({
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
    Default: "",
  },

  Quantity: {
    type: Number,
    required: true,
    Default: 1,
  },
  Image: {
    type: String,
    required: true,
  },
});

//Export the model
module.exports = mongoose.model("Product", Product);
