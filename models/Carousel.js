const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var Carousel = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Firstheading: {
    type: String,
    required: false,
  },
  Heading: {
    type: String,
    required: true,
  },
  Offer: {
    type: String,
    required: false,
  },
});

//Export the model
module.exports = mongoose.model("Carousel", Carousel);
