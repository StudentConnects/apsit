const express = require('express');
const path = require('path');
const debug = require('debug')('backend:server:student.js');

const router = express.Router();

router.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "student", "user.html"));
});
router.get("/allQuiz", (req, res) => {

    req.db.query("Select quiz_list.id, c.name as companyName, quiz_list.quiz_id as quizName, quiz_list.quiz_time from quiz_list inner join company c on quiz_list.company_id = c.id where quiz_list.isActive=1 and c.active = 1;")
        .then(results => {
            res.send(results[0]);
        })
        .catch(err => {
            debug(err);
            res.status(500).send(err);
        })
});

router.get('/fetchQuiz/:id/:quizId', (req, res) => {
    const { id, quizId } = req.params;
    req.db.query('call fetchQuiz(?, ?);', [id, quizId])
        .then(results => {
            if(results[0][0][0]["@Return"]){
                res.status(400).send(results[0][0][0]["@Return"])
            } else {
                res.send(results[0][0]);
            }
        })
        .catch(err => {
            debug(err);
            res.status(500).send(err);
        });
    
        // res.send({id, quizId});
})

router.use(express.static(path.join(__dirname, "..", "public", "student")));
module.exports = router;
