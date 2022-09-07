require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const compression = require("compression");
const add = require("./server/add.js");
const posts = require("./server/posts.js");
const secret = require("./server/secret.js");
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
app.use("/secret", secret);

const dbUrl =
    "mongodb+srv://" +
    process.env.NAME +
    ":" +
    process.env.PASSWORD +
    "@pics.5yrtzme.mongodb.net/all?retryWrites=true&w=majority";

mongoose
    .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("connected to db");
    })
    .catch((err) => console.log(err));

///////////////////////////////////

app.get("/", (req, res) => {
    res.render("./views/index/index.ejs");
});

app.listen(port, () => console.log(`server started on port ${port}`));