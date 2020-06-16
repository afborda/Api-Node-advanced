const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HelpDeskSchema = new Schema({
    name: String,
    surname: String,
    title: String,
    area: String,
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    type: String,
    priority: String,
    nregistration: String,
    description: String,
    status: String
});

module.exports = mongoose.model("HelpDesk", HelpDeskSchema);
