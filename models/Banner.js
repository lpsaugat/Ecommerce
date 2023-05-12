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
    type: String,
  },
});
module.exports = mongoose.model("Banner", Banner);
image;
