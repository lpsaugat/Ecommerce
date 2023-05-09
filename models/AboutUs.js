const mongoose = require("mongoose");

const aboutUs = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  heading: {
    type: String,
  },
  writing: {
    type: String,
  },
  image: {
    type: [String],
  },
  missionImage: {
    type: [String],
  },
  statistics: {
    type: [String],
  },
  statisticsNumber: {
    type: [Number],
  },
  mission: {
    type: [String],
  },
  vison: {
    type: [String],
  },
});
module.exports = mongoose.model("aboutUs", aboutUs);
