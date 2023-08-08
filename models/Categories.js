const mongoose = require("mongoose");

const slugify = require("slugify");
const Category = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    image: {
      type: [String],
    },
    slug: {
      type: String,
    },
    parentCategory: {
      type: [String],
      ref: "Category",
    },
    totalProducts: {
      type: Number,
    },
    status: {
      type: Boolean,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", Category);
