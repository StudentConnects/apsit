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
    if(req.session.viewCount)
    {
        req.session.viewCount++;
    }
    else{
        req.session.viewCount=1;
    }
    res.send(`<h1>you visited ${req.session.viewCount}</h1>`);
});

module.exports = router;
