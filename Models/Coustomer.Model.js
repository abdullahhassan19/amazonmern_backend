const mongoose = require("mongoose")

const CoustomerSchema = new mongoose.Schema({

  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const CoustomerModel = mongoose.model("AmazonCoustomers", CoustomerSchema);

module.exports={CoustomerModel}