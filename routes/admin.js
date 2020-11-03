const express = require('express');
const path = require('path');
const debug = require('debug')('backend:server:admin.js');
const {
    checkSchema,
    validationResult
} = require('express-validator');

const router = express.Router();



router.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "admin", "user.html"));
});

router.get("/listCompanies", (req, res) => {
    req.db.query("Select id, name from company where active = 1;")
        .then((results) => {
            res.send(results[0]);
        })
        .catch(err => {
            debug(err);
            res.status(500).send(err);
        })
});


router.post("/submitQuiz", (req, res) => {
    const data = req.body;
    // const data = ogData;
    data.quiz_Info.quizName = data.quiz_Info.quizName.toLowerCase().split(" ").join("_");
    debug("MAKING ENTERING DB");
    req.db.query("call addQuiz1(?, ?, ?, ?);", [data.quiz_Info.quizName, data.quiz_Info.quizCompanyId, data.quiz_Info.quizTime, (data.quiz_Info.isActive)?1:0])
        .then((results) => {
                debug("results returned");
                if(results[0][0][0]["@status"] === "success") {
                    debug("Inside if");
                const table = results[0][0][0]["@table"];
                const questionList = data.quiz_Questions.map(question => {
                    return([question.question, question.option_A, question.option_B, question.option_C, question.option_D, JSON.stringify(question.answer)]);
                });
            return req.db.query("insert into ?? (question, op1, op2, op3, op4, ans) values ?", [table, questionList])

            } else {
                debug("ERROR at 71");
                debug(results[0][0][0]);
                debug(results);
                res.status(500).send(results[0][0][0]["@status"]);
            }

        })
        .then((results) => {
            // res.send({results});
            res.send("SUCCESS");
            debug(results);
        })
        
        .catch(err => {
            debug("ERROR at 87");
            console.log(err);
            res.status(500).send(err);
        })
    // res.send(data);
});
router.use(express.static(path.join(__dirname, "..", "public", "admin")))
// debug(path.join(__dirname, "..", "public", "admin"))
module.exports = router;
