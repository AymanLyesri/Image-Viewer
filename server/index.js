const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const compression = require("compression");
const add = require("./add.js");
const posts = require("./posts.js");
const app = express();
const port = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static("./"));
app.use(
    compression({
        level: 6,
    })
);
app.use("/add", add);
app.use("/posts", posts);

const dbUrl =
    "mongodb+srv://ayman:avalid@pics.5yrtzme.mongodb.net/all?retryWrites=true&w=majority";
mongoose
    .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("connected to db");
    })
    .catch((err) => console.log(err));

///////////////////////////////////

app.get("/", (req, res) => {
    res.render("../views/index/index.ejs");
});

app.listen(port, () => console.log(`server started on port ${port}`));