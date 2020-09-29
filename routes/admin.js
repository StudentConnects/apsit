const express = require('express');
const path = require('path');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const debug = require('debug')('backend:server:admin.js');

const router = express.Router();

// Setting Passport for use
passport.use(new passportLocal({
    usernameField: 'email',
    passwordField: 'password'
  },
    async function(username, password, _done) {
        console.log("LINE 20");
        console.log(username, password);
        // if(username == "AdminAccount") {
        //     if(password == "123456") {
        //         console.log("Success verify");
        //         return done(null, {"email": username, "password": password, name: "Test Admin"});
        //     } else {
        //         console.log("Wrong Password")
        //         return done(null, false);
        //     }
        // } else if (username && password) {
        //     console.log("Wrong username or password")
        //     return done(null, false);
        // } else {
        //     console.log("No USERNAME and PASSWORD");
        //     return done(new Error("NO Username or Password"));
        // }
    }
));

passport.serializeUser(function(user, done) {
    console.log("LINE 41");
    console.log(user.email);
    done(null, JSON.stringify({"email":user.email, "password": user.password}));
});

passport.deserializeUser(function(id, done) {
    const {email: username, password} = JSON.parse(id);
    console.log("LINE 48");
    console.log(username, password);
    if(username == "DishaUser") {
        if(password == "123456") {
            console.log("Success verify");
            return done(null, {"email": username, "password": password, name: "Trial User"});
        } else {
            console.log("Wrong Password")
            return done(null, false);
        }
    } else if (username && password) {
        console.log("Wrong username or password")
        return done(null, false);
    } else {
        console.log("No USERNAME and PASSWORD");
        return done(new Error("NO Username or Password"));
    }
});

router.use(passport.session());
router.use(passport.initialize());


router.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "admin", "user.html"));
});
router.use(express.static(path.join(__dirname, "..", "public", "admin")))

module.exports = router;
