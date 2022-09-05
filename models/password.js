const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blogSchema = new Schema({
    password: String,
    admin: String,
});

const Password = mongoose.model("Password", blogSchema);

module.exports = Password;