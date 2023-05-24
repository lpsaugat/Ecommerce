const mongoose = require("mongoose");

const slugify = require("slugify");
const Category = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  slug: {
    type: String,
  },

  parent_of: {
    type: [String],
    ref: "Category",
  },
  status: {
    type: Boolean,
  },
});

Category.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model("Category", Category);
