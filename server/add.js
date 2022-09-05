const express = require("express");
const multer = require("multer");
const upload = multer({});
const Blog = require("../models/blogs");
const Password = require("../models/password");
const Pie = require("../models/pies");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("../views/add/add.ejs", { response: "" });
});

router.post("/", upload.array("image"), (req, res) => {
    if (req.files == null) {
        res.render("../views/add/add.ejs", {
            response: "Enter an Image",
        });
    }
    password = Password.find().then((key) => {
        console.log("key 1: " + key[0].admin + " || password: " + req.body.admin);

        const images = req.files;

        if (req.body.admin == key[0].admin) {
            images.forEach((image) => {
                const type = image.mimetype;
                const buffer = image.buffer.toString("base64");

                console.log(
                    "image size : " + buffer.length + "\n image type : " + type
                );

                let pie = new Pie({
                    data: buffer,
                    type: type,
                });

                pie
                    .save()
                    .then(() => {
                        console.log("image saved!!");
                    })
                    .catch((err) => {
                        console.log(err);
                        if (res.headersSent !== true) {
                            res.render("../views/add/add.ejs", { response: err });
                        }
                    })
                    .finally(() => {
                        console.log("images are uploaded");
                        if (res.headersSent !== true) {
                            res.render("../views/add/add.ejs", {
                                response: "image uploaded! to the good stuff",
                            });
                        }
                    });
            });
        } else {
            images.forEach((image) => {
                const type = image.mimetype;
                const buffer = image.buffer.toString("base64");

                console.log(
                    "image size : " + buffer.length + "\n image type : " + type
                );

                Blog.create({ data: buffer, type: type })
                    .then(() => {
                        console.log("image saved!!");
                    })
                    .catch((err) => {
                        console.log(err);
                        if (res.headersSent !== true) {
                            res.render("../views/add/add.ejs", { response: err });
                        }
                    })
                    .finally(() => {
                        console.log("all images are uploaded");
                        if (res.headersSent !== true) {
                            res.render("../views/add/add.ejs", {
                                response: "image uploaded!",
                            });
                        }
                    });
            });
        }
    });
});
module.exports = router;