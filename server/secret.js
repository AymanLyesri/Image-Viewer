const express = require("express");
const router = express.Router();
const Password = require("../models/password");
const Pie = require("../models/pies");

router.post("/", (req, res) => {
    let offset = parseInt(req.body.offset);

    if (req.body.next == "next") {
        offset += 15;
    }

    console.log("offset : " + offset);

    const password = req.body.password;

    Password.find()
        .then((key) => {
            console.log("key : " + key[0].password + " || password : " + password);
            if (key[0].password == password) {
                Pie.find()
                    .skip(offset)
                    .limit(15)
                    .then((result) => {
                        res.render("../views/posts/secret.ejs", {
                            result: result,
                            password: password,
                            offset: offset,
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