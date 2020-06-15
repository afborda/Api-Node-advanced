const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HelpDeskSchema = new Schema({
    name: String,
    surname: String,
    title: String,
    area: String,
    type: String,
    priority: String,
    nregistration: String,
    description: String,
});

module.exports = mongoose.model("HelpDesk", HelpDeskSchema);
