const mongoose = require("mongoose");

const Banner = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  title: {
    type: String,
  },
  text: {
    type: String,
  },
  image: {
    type: [String],
  },
  status: {
    type: Boolean,
    default: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
},  { timestamps: true }
);
module.exports = mongoose.model("Banner", Banner);
