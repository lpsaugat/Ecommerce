const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    Familysize: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    user_type: {
      type: String,
      enum: {
        values: ["super-admin", "admin", "vendor", "customer"],
        message: "{VALUE} is not supported",
      },
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("User", userSchema);
