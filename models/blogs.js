const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blogSchema = new Schema({
    data: Buffer,
    type: String,
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;