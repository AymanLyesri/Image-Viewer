const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blogSchema = new Schema({
    data: Buffer,
    type: String,
});

const Pie = mongoose.model("Pie", blogSchema);

module.exports = Pie;