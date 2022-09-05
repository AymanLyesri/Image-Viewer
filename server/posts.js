const express = require("express");
const router = express.Router();
const Blog = require("../models/blogs");
const Password = require("../models/password");
const Pie = require("../models/pies");

router.get("/", (req, res) => {
    Blog.find()
        .then((result) => {
            res.render("../views/posts/posts.ejs", {
                result: result,
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post("/", (req, res) => {
    password = req.body.password;

    Password.find()
        .then((key) => {
            console.log("key : " + key[0].password + " || password : " + password);
            if (key[0].password == password) {
                Pie.find()
                    .then((result) => {
                        res.render("../views/posts/posts.ejs", {
                            result: result,
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                console.log("password not good bruh");
                res.render("../views/index/index.ejs");
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;