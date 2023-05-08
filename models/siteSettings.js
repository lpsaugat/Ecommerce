const mongoose = require("mongoose");

const siteSettings = new mongoose.Schema({
  logo: {
    type: [String],
  },
  metaTitle: {
    type: String,
  },
  MetaDescription: {
    type: String,
  },
  copyrightText: {
    type: String,
  },
  siteDescription: {
    type: String,
  },
  facebook: {
    type: String,
  },
  instagram: {
    type: String,
  },
  linkedIn: {
    type: String,
  },
  address: {
    type: String,
  },
  telephone: {
    type: String,
  },
  email: {
    type: String,
  },
});
module.exports = mongoose.model("siteSettings", siteSettings);
