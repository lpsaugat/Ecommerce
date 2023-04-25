const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var Subscription = new mongoose.Schema(
  {
    Name: {
      type: String,
    },

    Heading: {
      type: String,
      required: true,
    },

    BackgroundImage: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Subscription", Subscription);
