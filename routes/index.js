const express = require('express');
const path = require('path');

const router = express.Router();
const debug = require('debug')('backend:server:index.js');

router.get("/", (req, res) => {
    debug("into /");
    console.log("into /");
    res.send(path.join(__dirname, "..", "public", "index.html"));
});
router.all('/test', function (req, res) {
    debug("into /test");
    console.log("into /test");
    if (req.session.viewCount) {
        req.session.viewCount++;
    } else {
        req.session.viewCount = 1;
    }
    res.send(`<h1>you visited ${req.session.viewCount}</h1>`);
});

router.all('/register', function (req, res) {
    console.log(req.body);
    console.log("Recieved at /register");
    req.db.query("Show tables;")
        .then((...results) => {
            console.log(...results);
            res.json(req.body);
            debug("Response Sent successfully");
        })
        .catch((err) => {
            debug(err);
            res.json({
                body: req.body,
                error: err
            });
            debug("Response Sent with error");
        });
});
module.exports = router;