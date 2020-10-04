const express = require('express');
const path = require('path');

const router = express.Router();
const debug = require('debug')('backend:server:student.js');

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "student", "user.html"));
});

router.use(express.static(path.join(__dirname, "..", "public", "student")))
module.exports = router;
