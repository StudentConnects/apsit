const express = require('express');
const path = require('path');

const router = express.Router();
const debug = require('debug')('backend:server:index.js');
const {
    checkSchema,
    validationResult
} = require('express-validator');
const ValidatorPizzaClient = require("validator-pizza-node");

const emailVerifier = new ValidatorPizzaClient().validate;


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

// {
//     fullname: 'OMKAR AGRAWAL',
//     mobile: '7977937694',
//     email: 'omkar3654@gmail.com',
//     password: 'wt^ZdS47RZz'
// }
router.post('/register',
    // (req, res, next) => {
    //     console.table([{
    //         ...req.body
    //     }]);
    //     next();
    // },
    checkSchema({
        "fullname": {
            in: ["body"],
            notEmpty: true,
            isString: true,
            trim: true,
        },
        "mobile": {
            in: ["body"],
            errorMessage: "Invalid input for Mobile",
            notEmpty: true,
            trim: true,
            isNumeric: true,
            isMobilePhone: {
                locale: "en-IN"
            },
            toInt: true
        },
        "email": {
            in: ["body"],
            notEmpty: true,
            isString: true,
            trim: true,
            normalizeEmail: true,
            custom: {
                options: (value, data) => {
                    // console.table([{...data}]);
                    return (new Promise((resolve, reject) => {
                        // deepcode ignore javascript%2Fdc_interfile_project%2FEqualityMisplacedParentheses: <please specify a reason of ignoring this>
                        if (data.location !== "body") {
                            console.log("Rejecting because not in body");
                            reject("Invalid Request");
                        } else {
                            console.log("Sending Request");
                            emailVerifier("email", value).then(
                                validated => {
                                    console.log("Remaining: " + validated.data.remaining_requests);
                                    if (validated.data.status != 200) {
                                        console.log("Failed Status + " + JSON.stringify(validated.data));
                                        reject("INVALID Email because of:\n" + JSON.stringify(validated.data));
                                    } else if (validated.data.did_you_mean || validated.data.disposable || !validated.data.mx || !validated.valid() || !validated.successful()) {
                                        // console.log(validated.did_you_mean || validated.disposable || !validated.mx || !validated.valid() || !validated.successful())
                                        const reason = "INVALID Email because of:\n" + JSON.stringify(validated.data) + "\n Valid: " + validated.valid() + "\n Successful: " + validated.successful();
                                        console.log("Rejecting Email in else if because of \n" + reason);
                                        reject(reason);
                                    } else {
                                        console.log("Resolving Request");
                                        resolve(validated.email);
                                    }
                                }
                            ).catch(
                                err => {
                                    console.log(err);
                                    reject("INVALID Email because of: \n" + err);
                                }
                            )
                        }
                    }));
                }
            }
        },
        "password": {
            in: ["body"],
            notEmpty: true,
            isString: true,
            trim: true,
            isLength: {
                options: {
                    min: 8
                }
            },
            custom: {
                options: (value, data) => {
                    if(data.location != "body") {
                        throw new Error("Invalid Request")
                    } else if(RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.\-_*])([a-zA-Z0-9@#$%^&+=*.₹_\-]){8,}$/).test(value)) {
                        return true
                    } else {
                        return Promise.reject("Password of min length 8 should contain at least 1 lowercase character, min of 1 UPPERCASE CHARACTER, a number and a special character");
                    }
                }
            }
        }
    }), (req, res) => {
        const results = validationResult(req)
        if (!results.isEmpty()) {
            res.status(400).json({
                errors: results.array()
            });
        } else {
            // console.table([{
            //     ...req.body
            // }]);

            console.log("Received at /register");
            // req.db.query("CALL Reg(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", [])
            //     .then((...results) => {
            //         console.log(...results);
            //         res.json(req.body);
            //         debug("Response Sent successfully");
            //     })
            //     .catch((err) => {
            //         debug(err);
            //         res.json({
            //             body: req.body,
            //             error: err
            //         });
            //         debug("Response Sent with error");
            //     });
            res.json(req.body);
        }
    });
module.exports = router;