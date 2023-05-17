const mongoose = require("mongoose");

const Category = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  parent_of: {
    type: [String],
    ref: "Category",
  },
});
module.exports = mongoose.model("Category", Category);
