const express = require('express');
const path = require('path');
const debug = require('debug')('backend:server:student.js');
const router = express.Router();
const uuid = require('uuid');

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

router.get("/listCompanies", (req, res) => {
    req.db
      .query("Select id, name, description, logo from company where active = 1;")
      .then((results) => {
        res.send(results[0]);
      })
      .catch((err) => {
        debug(err);
        res.status(500).send(err);
      });
  });

router.get('/fetchQuiz/:id/:quizId', (req, res) => {
    // console.log(req.params)
    const { id, quizId } = req.params;
    req.db.query('call fetchQuiz(?, ?);', [parseInt(id), quizId])   
    //(`Select * from ${quizId} `) //(Select * from quiz_list where id = ${id} and isActive = 1)
        //'call fetchQuiz(?, ?);', [parseInt(id), quizId])
        .then(results => {
            // console.log(results[0])
            if(results[0][0][0]["@Return"]){
                res.status(400).send(results[0][0][0]["@Return"])
            } else {
                // console.log(results[0][0])
                res.send(results[0][0]);
            }
        })
        .catch(err => {
            debug(err);
            res.status(500).send(err);
        });
    
        // res.send({id, quizId});
})

// Submit Quiz testing Route

router.post('/submitQuiz',(req,res)=>{
    // console.log(JSON.stringify(req.body[0]))
    // console.log(req.user)
    // console.log(typeof(req.user.id))
    req.db.query('insert into submitted_quiz( uid , qid , answers , marks ) values ( ? , ? , ? , ? )',[req.user.id,'quiz_id'+uuid.v4().slice(-10),JSON.stringify(req.body[0]),req.body[1].total])
    .then(result=>console.log(result))
    .catch(err => console.log(err));
    res.json({
        message:'Test Submitted Sucessfully !!!'
    })
});


router.use(express.static(path.join(__dirname, "..", "public", "student")));
module.exports = router;
