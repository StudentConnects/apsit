const express = require('express');
const path = require('path');

const router = express.Router();
const debug = require('debug')('backend:server:index.js');
// debug("Into Index File");
const studentRouter = require('./student');
const adminRouter = require('./admin');


router.all("/", (_req, res) => {
    debug("into /");
    console.log("into /");
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
router.all('/test', function(_req,res) {
    debug("into /test");
    console.log("into /test");
    res.send("TEST SUCCESS");
});

router.use("/assets", express.static(path.join(__dirname, "..", "public", "assets")));
router.use("/admin", express.static(path.join(__dirname, "..", "public", "admin")))
router.use("/student", express.static(path.join(__dirname, "..", "public", "student")))


router.use('/admin', adminRouter);
router.use('/student', studentRouter);
module.exports = router;
