const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^[a-zA-Z]+$/.test(value);
        },
        message: "Name must contain only letters",
      },
    },
    familySize: {
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

    user_type: {
      type: String,
      enum: {
        values: ["super-admin", "admin", "vendor", "customer"],
        message: "{VALUE} is not supported",
      },
      default: "customer",
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("User", userSchema);
