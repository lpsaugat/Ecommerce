const mongoose = require("mongoose");

const aboutUs = new mongoose.Schema({
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
    type: [String],
  },
  missionImage: {
    type: [String],
  },
  statistics: {
    type: [String],
  },
  statisticsNumber: {
    type: [String],
  },
  mission: {
    type: [String],
  },
  vison: {
    type: [String],
  },
});
module.exports = mongoose.model("aboutUs", aboutUs);
