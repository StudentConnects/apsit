(function () {
  // Functions
  function buildQuiz() {
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // variable to store the list of possible answers
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(`<label class="container-checkbox">${letter} : ${currentQuestion.answers[letter]}
                        <input type="checkbox" name="question_${questionNumber}" value="${letter}">
                        <span class="checkmark"></span>
                        </label>`);
      }

      // add this question and its answers to the output
      output.push(`<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`);
    });

    // finally combine our output list into one string of HTML and put it on the
    // page
    quizContainer.innerHTML = output.join("");
  }

  function buildQuizNo() {
    const questionno = [];
    // for each questionNo...
    myQuestions.forEach((questions, index) => {
      questionno.push(
        `<button class="btn btn-info btn-just-icon" value="${index}" >${
          index + 1
        }</button>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the
    // page
    quizQuestionsNo.innerHTML = questionno.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question_${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      }
      // if answer is wrong or blank
      else {
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    if (currentSlide === slides.length - 1) {
      submitButton.style.display = "inline-block";
    } else {
      submitButton.style.display = "none";
    }
  }

  function showIndexSlide(n) {
    showSlide(n);
  }

  // Variables
  const quizContainer = document.getElementById("quiz_questions");
  const quizQuestionsNo = document.getElementById("quiz_questions_no");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const myQuestions = [
    {
      question: "Who invented JavaScript?",
      answers: {
        a: "Douglas Crockford",
        b: "Sheryl Sandberg",
        c: "Brendan Eich",
      },
      correctAnswer: "c",
    },
    {
      question: "Which one of these is a JavaScript package manager?",
      answers: { a: "Node.js", b: "TypeScript", c: "npm" },
      correctAnswer: "c",
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: { a: "Angular", b: "jQuery", c: "RequireJS", d: "ESLint" },
      correctAnswer: "d",
    },
  ];

  // Kick things off
  buildQuiz();

  buildQuizNo();
  // Pagination
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener("click", showResults);

  quizQuestionsNo.addEventListener("click", (event) => {
    const isButton = event.target.nodeName === "BUTTON";
    if (!isButton) {
      return;
    }
    // console.dir(event.target.id);
    showIndexSlide(Number(event.target.value));
  });
})();

function toggleQuiz() {
  let quiz_question = document.getElementById("quiz_question_container");
  let select_company = document.getElementById("select_company_quiz");
  quiz_question.classList.toggle("hidden");
  select_company.classList.toggle("hidden");
  quizTimer();
}

function quizTimer() {
  var sec = 1800,
    countDiv = document.getElementById("Quiztimer");
  countDown = setInterval(function () {
    "use strict";
    secpass();
  }, 1000);
  function secpass() {
    "use strict";
    var min = Math.floor(sec / 60),
      remSec = sec % 60;
    if (remSec < 10) {
      remSec = "0" + remSec;
    }
    if (min < 10) {
      min = "0" + min;
    }
    countDiv.innerHTML = min + ":" + remSec;
    if (sec > 0) {
      sec = sec - 1;
    } else {
      clearInterval(countDown);
      countDiv.innerHTML = "countdown done";
    }
  }
}

document.addEventListener(
  "DOMContentLoaded",
  function () {
    fetch("/users/student/allQuiz", {
      method: "GET",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) =>
        response.json().then((text) => {
          if (response.ok) {
            console.log(text);
            append_json(text);
          }
          return response.status;
        })
      )
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  },
  false
);

// this function appends the json data to the table 'company_list'
function append_json(data) {
  var company = "";

  var buttons =
    '<button type="button" class="btn btn-success" onclick="toggleQuiz()" >Start Quiz</button>';

  // ITERATING THROUGH OBJECTS
  $.each(data, function (key, value) {
    // CONSTRUCTION OF ROWS HAVING
    // DATA FROM JSON OBJECT
    company += "<tr>";
    company += '<td class="text-center">' + value.id + "</td>";
    company += "<td>" + value.companyName + "</td>";
    company += "<td>" + value.quizName + "</td>";
    company += "<td>" + value.quiz_time + "</td>";
    company += '<td class="td-actions">' + buttons + "</td>";
    company += "</tr>";
  });

  // INSERTING ROWS INTO TABLE
  $("#allQuiz").append(company);
}
