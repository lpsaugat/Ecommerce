const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const Carousel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    firstheading: {
      type: String,
      required: false,
    },
    heading: {
      type: String,
      required: true,
    },
    offer: {
      type: String,
      required: false,
    },
    backgroundImage: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Carousel", Carousel);
