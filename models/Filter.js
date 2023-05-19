const mongoose = require("mongoose");

const Filter = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  familySize: {
    type: [String],
  },
  premiumSubscription: {
    type: [String],
  },
  productCategories: {
    type: [String],
  },
  ratings: {
    type: [Number],
  },
  status: {
    type: Boolean,
  },
});
module.exports = mongoose.model("Filter", Filter);
