const mongoose = require("mongoose");

const Category = new mongoose.Schema({
  logo: {
    type: String,
    unique: true,
  },
  metaTitle: {
    type: String,
    unique: true,
  },
  MetaDescription: {
    type: String,
    unique: true,
  },
  copyrightText: {
    type: String,
    unique: true,
  },
  siteDescription: {
    type: String,
    unique: true,
  },
  address: {
    type: String,
    unique: true,
  },
  telephone: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
});
module.exports = mongoose.model("Category", Category);
