const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imageurl: { type: String },
  userId: { type: String, required: true },
});

const DataModel = mongoose.model("AmazonData", DataSchema);

module.exports = { DataModel };
