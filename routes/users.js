const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const router = express.Router();
const debug = require('debug')('backend:server:index.js');
// debug("Into Index File");
const studentRouter = require('./student');
const adminRouter = require('./admin');

router.all("/", (_req, res) => {
    debug("into /");
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
router.all('/test', function (_req, res) {
    debug("into /test");
    res.send("TEST SUCCESS");
});

router.use("/assets", express.static(path.join(__dirname, "..", "public", "assets")));
router.use("/admin", express.static(path.join(__dirname, "..", "public", "admin")))
router.use("/student", express.static(path.join(__dirname, "..", "public", "student")))

function checkLogin(req, res, next) {
    if(req.user.uType == req.differentUserType){
            res.redirect(301, `/users/${req.differentUserType}`);
        } else if(req.user.uType == req.allowedUserType) {
            next();
        } else {
            res.redirect("/login");
        }
    // } else {
    //     console.warn("in secured in not authenticated");
    //     res.redirect("/login");
    // }
}

// router.use('/admin', (req, _, next) => {req.allowedUserType = "admin"; req.differentUserType = "student"; next();}, checkLogin, adminRouter);
// router.use('/student', (req, _, next) => {req.allowedUserType = "student"; req.differentUserType = "admin"; next();}, checkLogin, studentRouter);
router.use('/admin', adminRouter);
router.use('/student', studentRouter);
module.exports = router;