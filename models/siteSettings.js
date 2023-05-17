const mongoose = require("mongoose");

const siteSettings = new mongoose.Schema(
  {
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
    fav_icon: {
      type: String,
    },
    socials: {
      type: mongoose.Types.ObjectId,
      ref: "Social",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("siteSettings", siteSettings);
