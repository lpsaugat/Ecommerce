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
  missionTitle: {
    type: [String],
  },
  mission: {
    type: [String],
  },
  visionTitle: {
    type: [String],
  },
  vision: {
    type: [String],
  },
});
module.exports = mongoose.model("aboutUs", aboutUs);
