const mongoose = require("mongoose");

var Category = new mongoose.Schema({
  name: {
    type: String,
  },
});
module.exports = mongoose.model("Category", Category);
