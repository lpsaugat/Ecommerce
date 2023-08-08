const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const Subscription = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    subscriptionText: {
      type: String,
      required: true,
    },

    backgroundImage: {
      type: [String],
      required: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Subscription", Subscription);
