const express = require('express');
const path = require('path');

const router = express.Router();
const debug = require('debug')('backend:server:admin.js');

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "admin", "user.html"));
});
router.use(express.static(path.join(__dirname, "..", "public", "admin")))

module.exports = router;
