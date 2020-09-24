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
router.all('/test', function(req,res) {
    debug("into /test");
    console.log("into /test");
//please put the code in here omkar
// it works with res.sendFile() but only renders in html file but no js and css , even after using cors
//i am unable to resolve this basic yet imp issue
    res.send("TEST SUCCESS");
});

module.exports = router;
