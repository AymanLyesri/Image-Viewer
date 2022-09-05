const express = require("express");
const router = express.Router();
const Blog = require("../models/blogs");

router.get("/", (req, res) => {
    Blog.find()
        .limit(15)
        .then((result) => {
            res.render("../views/posts/posts.ejs", {
                result: result,
                offset: 0,
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post("/", (req, res) => {
    let offset = parseInt(req.body.offset);

    if (req.body.next == "next") {
        offset += 15;
    }

    console.log("offset : " + offset);

    Blog.find()
        .skip(offset)
        .limit(15)
        .then((result) => {
            res.render("../views/posts/posts.ejs", {
                result: result,
                offset: offset,
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;