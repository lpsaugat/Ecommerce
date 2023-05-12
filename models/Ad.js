const mongoose = require("mongoose");

const Ad = new mongoose.Schema({
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
module.exports = mongoose.model("Ad", Ad);
