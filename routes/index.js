const express = require('express');
const path = require('path');

const router = express.Router();
const debug = require('debug')('backend:server:index.js');
debug("Into Index File");

router.all("/", (req, res) => {
    debug("into /");
    console.log("into /");
    res.send(path.join(__dirname, "..", "public", "index.html"));
});
router.all('/test', function (req, res) {
    debug("into /test");
    console.log("into /test");
    res.send("TEST SUCCESS");
});

module.exports = router;
