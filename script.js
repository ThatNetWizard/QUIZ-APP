const questions = [
  {
    question: "What is the fastest land animal in the world?",
    answers: [
      {text: "Cheetah", correct: true},
      {text: "Giraffe", correct: false},
      {text: "Lion", correct: false},
      {text: "Leopard", correct: false},
      {text: "Kangaroo", correct: false}
    ]
  },
  {
    question: "What is the largest and deepest ocean in the world?",
    answers: [
      {text: "Atlantic Ocean", correct: false},
      {text: "Indian Ocean", correct: false},
      {text: "Pacific Ocean", correct: true},
      {text: "Antartic Ocean", correct: false},
      {text: "Arctic Ocean", correct: false}
    ]
  },
  {
    question:"Which among these Popes became the first American to be elected Pope?",
    answers: [
      {text: "Pope Leo XIV", correct: true},
      {text: "Pope Francis", correct: false},
      {text: "Pope Benedict XVI", correct: false},
      {text: " Pope John Paul II", correct: false},
      {text: "Pope John XXIII", correct: false}
    ]
  },
  {
    question: "Which continent is the smallest on earth?",
    answers: [
      {text: "Asia", correct: false},
      {text: "Africa", correct: false},
      {text: "Australia", correct: true},
      {text: "Antarctica", correct: false},
      {text: "Europe", correct: false}
    ]
  },
  {
    question: "What is the most watched and played sport worldwide?",
    answers: [
      {text: "Cricket", correct: false},
      {text: "Field Hockey", correct: false},
      {text: "Basketball", correct: false},
      {text: "Volleyball", correct: false},
      {text: "Football-(Soccer)", correct: true}
    ]
  },
  {
    question: "What is the full meaning of CCTV?",
    answers: [
      {text: "Computer Cordless Television" , correct: false},
      {text: "Closed Computer Television", correct: false},
      {text: "Closed-Circuit Television", correct: true},
      {text: "Computerized Camera Television", correct: false},
      {text: "Closed Camera Television", correct: false}
    ]
  },
  {
    question: "What is the internal framework of the body?",
    answers: [
      {text: "Heart", correct: false},
      {text: "Intestines", correct: false},
      {text: "Liver", correct: false},
      {text: "Skeleton", correct: true},
      {text: "Kidneys", corrrect: false}
    ]
  },
  {
    question: "Which country is known for their pyramid structure?",
    answers: [
      {text: "America", correct: false},
      {text: "China", correct: false},
      {text: "Egypt", correct: true},
      {text: "France", correct: false},
      {text: "Germany", correct: false}
    ]
  }
];

const questionLog = document.querySelector("#questions");
const answerBtns = document.querySelector("#answer-buttons");
const nextBtn = document.querySelector("#next-button");

// variables that updates questions and scores
let currentQuestionIndex = 0;
let score = 0;

const beginQuiz = () => {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  displayQuestion();
}

const displayQuestion = () => {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionLog.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerBtns.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });

}

const resetState = () => {
  nextBtn.style.display = "none";
  while(answerBtns.firstChild) {
    answerBtns.removeChild(answerBtns.firstChild);
  }
}

const selectAnswer = (e) => {
  const selectButton = e.target;
  const isCorrect = selectButton.dataset.correct === "true";
  if (isCorrect) {
    selectButton.classList.add("correct");
    score++;
  }else {
    selectButton.classList.add("incorrect");
  }
  // Automatically highlights the correct button if user selects wrong answer and other buttons are disabled.
  Array.from(answerBtns.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}

const displayScore = () => {
  resetState();
  if (score === questions.length) {
    questionLog.innerHTML = ` Congratulations, You scored ${score} out of ${questions.length} questions, you are super intelligent!`;
  }else {
    questionLog.innerHTML = `You scored ${score} out of ${questions.length} questions, put more effort!`
  }

  nextBtn.innerHTML = "Refresh!"
  nextBtn.style.display = "block";
}
const updateNextBtn = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  }else {
    displayScore();
  }
}
nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    updateNextBtn();
  }else {
    beginQuiz();
  }
});

beginQuiz();