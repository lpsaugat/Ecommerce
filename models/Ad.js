const mongoose = require("mongoose");

const Ad = new mongoose.Schema({
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
module.exports = mongoose.model("Ad", Ad);
