const mongoose = require("mongoose");

var Product = new mongoose.Schema({
  name: {
    type: String,
  },
});
module.exports = mongoose.model("Category", Category);
