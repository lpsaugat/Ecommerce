const mongoose = require("mongoose");

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
module.exports = mongoose.model("Category", Category);
