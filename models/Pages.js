const mongoose = require("mongoose");

const Pages = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    title: {
      type: String,
    },
    Description: {
      type: String,
    },
    carousel: {
      type: [mongoose.Types.ObjectId],
      ref: "Carousel",
    },
    banner: {
      type: [mongoose.Types.ObjectId],
      ref: "Banner",
    },
    ad: {
      type: [mongoose.Types.ObjectId],
      ref: "Ad",
    },
    packageTypes: {
      type: [mongoose.Types.ObjectId],
      ref: "PackageTypes",
    },
    parent_of: {
      type: [mongoose.Types.ObjectId],
      ref: "Pages",
    },
    filter: {
      type: [mongoose.Types.ObjectId],
      ref: "Filter",
    },
    status: Boolean,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Pages", Pages);
