const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const Subscription = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    heading: {
      type: String,
      required: true,
    },

    backgroundImage: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Subscription", Subscription);
