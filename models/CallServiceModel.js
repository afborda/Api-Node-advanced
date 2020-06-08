const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CallServiceSchema = new Schema({
  title: String,
  description: String,
  status: String,
  user: String,
  technical: String,
});

module.exports = mongoose.model("CallService", CallServiceSchema);
