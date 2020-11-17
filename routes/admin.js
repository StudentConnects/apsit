const express = require("express");
const path = require("path");
const debug = require("debug")("backend:server:admin.js");
const { checkSchema, validationResult } = require("express-validator");

const router = express.Router();

router.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "admin", "user.html"));
});

router.all('/test', function (_req, res) {
    debug("into /test");
    res.send("TEST SUCCESS");
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

router.post("/addCompany",
  checkSchema({
    company_name: {
      in: ["body"],
      notEmpty: true,
      isString: true,
      trim: true,
      isLength: {
        options: {
          max: 30,
          min: 1,
        },
        errorMessage: "Needs to be min:1 letter name or maximum 30 letter name",
      },
    },
    company_description: {
      in: ["body"],
      notEmpty: true,
      isString: true,
      trim: true,
      isLength: {
        options: {
          max: 1000,
          min: 5,
        },
        errorMessage: "Min 5 letters max 2000 letters",
      },
    },
    company_logo: {
      in: ["body"],
      notEmpty: true,
      isString: true,
      trim: true,
      isURL: true,
      isLength: {
        options: {
          max: 325,
          min: 11,
        },
        errorMessage: "Needs to be min: 11 Max 325",
      },
    },
  }),
  (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
      debug(req.body);
      res.status(400).json({
        errors: results.array(),
      });
    } else {
      req.db
        .query("call addComp(?, ?, ?, ?);", [
          req.body.isActive ? 1 : 0,
          req.body.company_name,
          req.body.company_description,
          req.body.company_logo,
        ])
        .then((results) => {
          if (results[0][0][0]["@status"] === "Company details added") {
            // debug("Inside if");
            res.send("Success");
          } else {
            res.status(500).send({ results });
          }
        });
    }
  }
);
router.post("/submitQuiz", (req, res) => {
  const data = req.body;
  // const data = ogData;
  data.quiz_Info.quizName = data.quiz_Info.quizName
    .toLowerCase()
    .split(" ")
    .join("_");
  debug("MAKING ENTERING DB");
  req.db
    .query("call addQuiz1(?, ?, ?, ?);", [
      data.quiz_Info.quizName,
      data.quiz_Info.quizCompanyId,
      data.quiz_Info.quizTime,
      data.quiz_Info.isActive ? 1 : 0,
    ])
    .then((results) => {
      debug("results returned");
      if (results[0][0][0]["@status"] === "success") {
        debug("Inside if");
        const table = results[0][0][0]["@table"];
        const questionList = data.quiz_Questions.map((question) => {
          return [
            question.question,
            question.option_A,
            question.option_B,
            question.option_C,
            question.option_D,
            JSON.stringify(question.answer),
          ];
        });
        
        return req.db.query(
          "insert into ?? (question, op1, op2, op3, op4, ans) values ?",
          [table, questionList]
        );
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

    .catch((err) => {
      debug("ERROR at 87");
      console.log(err);
      res.status(500).send(err);
    });
  // res.send(data);
});

router.delete("/disableCompany", (req, res) => {
  const { id } = req.body;
  req.db
    .query("update company set active = 0 where id = ? and active= 1;", [id])
    .then((results) => {
      // console.log(results);
      // res.send(results[0]);
      let info = results[0].info.split(":");
      if (info[1].includes("0") || info[2].includes("0")) {
        console.log("INCORRECT ID");
        console.log(results);
        res.send("Incorrect ID");
      } else if (info[1].includes("1") && info[2].includes("1")) {
        res.send("Success");
      } else {
        console.log(info);
        res.status(500).send(results.info);
      }
    });
});

router.patch("/enableCompany", (req, res) => {
  const { id } = req.body;
  req.db
    .query("update company set active = 1 where id = ? and active= 0;", [id])
    .then((results) => {
      // console.log(results);
      // res.send(results[0]);
      let info = results[0].info.split(":");
      if (info[1].includes("0") || info[2].includes("0")) {
        console.log("INCORRECT ID");
        console.log(results);
        res.send("Incorrect ID");
      } else if (info[1].includes("1") && info[2].includes("1")) {
        res.send("Success");
      } else {
        console.log(info);
        res.status(500).send(results.info);
      }
    });
});

router.get('/listInactiveCompany', (req, res) => {
  req.db.query('select name, description, logo from company where active=0;')
    .then(results => {
      res.send(results);
    })
    .catch(err => {
      debug(err);
      res.status(500).send(err);
    });
});

router.use(express.static(path.join(__dirname, "..", "public", "admin")));
// debug(path.join(__dirname, "..", "public", "admin"))
module.exports = router;
