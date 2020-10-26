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
    res.send(path.join(__dirname, "..", "public", "index.html"));
});
router.all('/test', function (req, res) {
    debug("into /test");
    if (req.session.viewCount) {
        req.session.viewCount++;
    } else {
        req.session.viewCount = 1;
    }
    res.send(`<h1>you visited ${req.session.viewCount}</h1>`);
});

router.get("/registrationSuccess", (req, res) => {
    res.send("Thank you for the registration, You have been successfully registered! Now you can login after you veify your account from the email just sent to you.");
})

// {
//     "fullname": "OMKAR AGRAWAL",
//     "email": "omkar3654@gmail.com",
//     "password": "%Cz44^G2ZfX",
//     "institute_name": "",
//     "mobile": 7977937694,
//     "address": "B-12/601 silver sarita near pooja park, kashimira mira road(E)",
//     "city": "Select",
//     "country": "India",
//     "postcode": "401107",
//     "photo": "Not yet implemented"
// }
router.post('/register',
    checkSchema({
        "fullname": {
            in: ["body"],
            notEmpty: true,
            isString: true,
            trim: true,
            isLength: {
                options: {
                    max: 50,
                    min: 5
                },
                errorMessage: "Needs to be min: 5 Max 50"
            }
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
                            debug("Rejecting because not in body");
                            reject("Invalid Request");
                        } else {
                            debug("Sending Request");
                            emailVerifier("email", value).then(
                                validated => {
                                    debug("Remaining: " + validated.data.remaining_requests);
                                    if (validated.data.status != 200) {
                                        debug("Failed Status + " + JSON.stringify(validated.data));
                                        reject("INVALID Email because of:\n" + JSON.stringify(validated.data));
                                    } else if (validated.data.did_you_mean || validated.data.disposable || !validated.data.mx || !validated.valid() || !validated.successful()) {
                                        // debug(validated.did_you_mean || validated.disposable || !validated.mx || !validated.valid() || !validated.successful())
                                        const reason = "INVALID Email because of:\n" + JSON.stringify(validated.data) + "\n Valid: " + validated.valid() + "\n Successful: " + validated.successful();
                                        debug("Rejecting Email in else if because of \n" + reason);
                                        reject(reason);
                                    } else {
                                        debug("Resolving Request");
                                        resolve(validated.email);
                                    }
                                }
                            ).catch(
                                err => {
                                    debug(err);
                                    reject("INVALID Email because of: \n" + err);
                                }
                            )
                        }
                    }));
                }
            },
            isLength: {
                options: {
                    max: 50,
                    min: 10
                },
                errorMessage: "Needs to be min: 10 Max 50"
            }
        },
        "password": {
            in: ["body"],
            notEmpty: true,
            isString: true,
            trim: true,
            isLength: {
                options: {
                    max: 50,
                    min: 8
                },
                errorMessage: "Needs to be min: 8 Max: 50"
            },
            custom: {
                options: (value, data) => {
                    if (data.location != "body") {
                        throw new Error("Invalid Request")
                    } else if (RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.\-_*])([a-zA-Z0-9@#$%^&+=*.₹_\-]){8,}$/).test(value)) {
                        return true
                    } else {
                        return Promise.reject("Password of min length 8 should contain at least 1 lowercase character, min of 1 UPPERCASE CHARACTER, a number and a special character");
                    }
                }
            }
        },
        "institute_name": {
            in: ["body"],
            notEmpty: true,
            isString: true,
            isAlpha: true,
            trim: true,
            isLength: {
                options: {
                    max: 50,
                    min: 4
                },
                errorMessage: "Needs to be min: 4 Max 50"
            }
        },
        "mobile": {
            in: ["body"],
            errorMessage: "Invalid input for Mobile",
            notEmpty: true,
            trim: true,
            isNumeric: true,
            isInt: true,
            isMobilePhone: {
                locale: "en-IN"
            },
            toInt: true,
        },
        "address": {
            in: ["body"],
            notEmpty: true,
            isString: true,
            trim: true,
            isLength: {
                options: {
                    max: 255,
                    min: 5
                },
                errorMessage: "Needs to be min: 5 Max 255"
            }
        },
        "city": {
            in: ["body"],
            notEmpty: true,
            isString: true,
            isAlpha:true,
            trim: true,
            isLength: {
                options: {
                    max: 15,
                    min: 5
                },
                errorMessage: "Needs to be min: 5 Max 15"
            }
        },
        "country": {
            in: ["body"],
            notEmpty: true,
            isString: true,
            trim: true,
            isAlpha: true,
            isLength: {
                options: {
                    max: 25,
                    min: 5
                },
                errorMessage: "Needs to be min: 5 Max 25"
            }
        },
        "postcode": {
            in: ["body"],
            errorMessage: "Invalid input for Postcode",
            notEmpty: true,
            trim: true,
            isNumeric: true,
            isInt: true,
            isPostalCode: {
                options: "IN"
            },
            toInt: true,
        },
        "photo": {
            in: ["body"],
            notEmpty: true,
            isString: true,
            trim: true,
            isURL: true,
            isLength: {
                options: {
                    max: 325,
                    min: 11
                },
                errorMessage: "Needs to be min: 11 Max 325"
            }
        }
    }), (req, res) => {
        const results = validationResult(req)
        if (!results.isEmpty()) {
            debug(req.body);
            res.status(400).json({
                errors: results.array()
            });
        } else {
            // console.table([{
            //     ...req.body
            // }]);

            // debug("Received at /register");
            req.db.query("CALL Reg(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", [req.body.email, req.body.password, req.body.fullname, req.body.mobile, req.body.address, req.body.city, req.body.country, req.body.postcode, req.body.institute_name, req.body.photo])
                .then((...results) => {
                    const data = results[0][0][0];
                    console.table([{id: data.id, email: data.email, status: data["@status"], isVerified: data.isVerified}]);    
                    // res.json(req.body);
                    // res.redirect("/registrationSuccess")
                    debug("Response Sent successfully");
                    res.send("Registration Successful");
                })
                .catch((err) => {
                    debug(err);
                    res.json({
                        body: req.body,
                        error: err
                    });
                    debug("Response Sent with error");
                });

            // res.json(req.body);
        }
    });
module.exports = router;