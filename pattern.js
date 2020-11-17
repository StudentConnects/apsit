const submitQuiz_in = [{
    "company_name": "Google",
    "quiz_name": "Advance Java",
    "quiz_time": 15
  },
  {
    "question_no": 1,
    "question": "What is java",
    "answer_type": "Single",
    "option_1": "A",
    "option_2": "B",
    "option_3": "C",
    "option_4": "D",
    "answer": {
      "checkbox_1": true,
      "checkbox_2": false,
      "checkbox_3": false,
      "checkbox_4": false
    }
  },
  {
    "question_no": 2,
    "question": "what is GO",
    "answer_type": "Single",
    "option_1": "A",
    "option_2": "B",
    "option_3": "C",
    "option_4": "D",
    "answer": {
      "checkbox_1": true,
      "checkbox_2": false,
      "checkbox_3": false,
      "checkbox_4": false
    }
  },
  {
    "question_no": 3,
    "question": "What is HTML",
    "answer_type": "Single",
    "option_1": "A",
    "option_2": "B",
    "option_3": "C",
    "option_4": "D",
    "answer": {
      "checkbox_1": false,
      "checkbox_2": false,
      "checkbox_3": false,
      "checkbox_4": true
    }
  }
];

const login_in = {
  "email": "admin@admin",
  "password": "admin"
};

const registerUser_in = {
  "fullname": "John Doe",
  "email": "johndoe@gmail.com",
  "password": "johndoe",
  "institute_name": "ABCDEFG",
  "mobile": 1234567890,
  "address": "Address",
  "city": "Mumbai",
  "country": "India",
  "postcode": "400001",
  "photo": "/images/something.jpg"
};

const addCompany_in = {
  "company_name": "asdsad",
  "company_description": "dsadsada",
  "company_logo": "/images/1604424714719--test.jpg",
  "isActive": 1
};

const disableCompany_in = {
  "id": 1
};

const enableCompany_in = {
  "id": 1
};

const listInactiveCompanies_out = [{
    name: 'ABCD',
    description: 'ABCD',
    logo: 'ABCD'
  },
  {
    name: 'DGG',
    description: 'G',
    logo: '/images/1604572332870--test.jpg'
  }
];

const listActiveCompanies_out = [{
    id: 1,
    name: 'A',
    description: 'ABC',
    logo: 'logo'
  },
  {
    id: 2,
    name: '2',
    description: 's',
    logo: 'sdfs'
  },
  {
    id: 3,
    name: 'a',
    description: 'aa',
    logo: 'aaadacfwa'
  },
  {
    id: 5,
    name: 'asdsad',
    description: 'dsadsada',
    logo: '/images/1604424714719--test.jpg'
  },
  {
    id: 6,
    name: 'asdsad',
    description: 'dsadsada',
    logo: '/images/1604424714719--test.jpg'
  },
]

const addCompany_out = "Success";

const submitQuiz_out = "SUCCESS";

const disableCompany_out = {
  success: "Success",
  incorrect: "Incorrect ID"
};
const enableCompany_out = {
  success: "Success",
  incorrect: "Incorrect ID"
};

const allQuiz_out = [{
    id: 1,
    companyName: 'a',
    quizName: 'asdsadtfvjhbjhb_',
    quiz_time: 16565265
  },
  {
    id: 2,
    companyName: 'a',
    quizName: 'java_adv',
    quiz_time: 20
  },
  {
    id: 3,
    companyName: 'apsit-backend',
    quizName: 'demo_quiz',
    quiz_time: 10
  }
];

const fetchQuiz_out = {
  success: [{
      id: 1,
      question: 'what is java',
      op1: 'jasdjksad',
      op2: 'dsadsa',
      op3: 'adsad',
      op4: 'dasda'
    },
    {
      id: 2,
      question: 'what is dkadsmkad',
      op1: 'dsadsa',
      op2: 'dsadsad',
      op3: 'dasd',
      op4: 'dasdasda'
    }
  ],
  incorrect: "Invalid"
};

const companyQuizs_out = {
  success: [ { id: 2, quiz_id: 'java_adv', quiz_time: 20 } ],
  failure: "No Quiz"
};


module.exports = {
  toBackend: {
    login_in,
    submitQuiz_in,
    registerUser_in,
    addCompany_in,
    disableCompany_in,
    enableCompany_in,

  },
  fromBackend: {
    listActiveCompanies_out,
    listInactiveCompanies_out,
    addCompany_out,
    submitQuiz_out,
    disableCompany_out,
    enableCompany_out,
    allQuiz_out,
    fetchQuiz_out,
    companyQuizs_out,

  }
}