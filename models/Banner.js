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
});
module.exports = mongoose.model("Banner", Banner);
