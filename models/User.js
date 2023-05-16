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
    status: {
      type: Boolean,
      default: false,
    },

    password: {
      type: String,
      required: true,
      // minlength: [8, "Password should be atleast 8 characters long"],
      // validate: [
      //   {
      //     validator: function (v) {
      //       return (
      //         /\d/.test(v) &&
      //         /[A-Z]/.test(v) &&
      //         /[!@#$%^&*()_+\-={}[\]\\|'"/?.>,<`~]/.test(v)
      //       );
      //     },
      //     message:
      //       "Password should contain at least 1 number, 1 special character and 1 capital letter",
      //   },
      // ],
    },

    user_type: {
      type: String,
      ref: "Role",
    },
    permission: {
      type: [String],
      ref: "Permission",
    },
    token: {
      type: String,
    },
    Verifytoken: {
      type: String,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("User", userSchema);
