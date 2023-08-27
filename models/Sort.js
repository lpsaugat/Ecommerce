const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const Sort = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    sortText: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Sort", Sort);
