const mongoose = require("mongoose");

const Banner = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  heading: {
    type: String,
  },
  writing: {
    type: String,
  },
  image: {
    type: String,
  },
});
module.exports = mongoose.model("Banner", Banner);
