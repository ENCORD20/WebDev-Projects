const questions = [
    {
        question: "What is the SI unit of electric current?",
        options: ["Volt", "Ohm", "Ampere", "Watt"],
        answer: 2
    },
    {
        question: "Which of the following laws describes the relationship between the current and voltage in a conductor?",
        options: ["Faraday's Law", "Newton's Second Law", "Ohm's Law", "Coulomb's Law"],
        answer: 2
    },
    {
        question: "What is the principle behind the operation of a transformer?",
        options: ["Electromagnetic Induction", "Conservation of Momentum", "Conservation of energy", "Newton's 3rd law"],
        answer: 0
    },
    {
        question: "What type of energy transformation occurs in a hydroelectric power plant",
        options: ["Chemical to electrical", "Mechanical to electrical", "Thermal to electrical", "Kinetic to thermal"],
        answer: 1
    },
    {
        question: "What is the correct formula for calculating speed? (s=distance, t=time)",
        options: ["s-t", "s+t", "s^t", "s/t"],
        answer: 3
    },
    // You can add more questions here
];


let currentQuestion = 0;
let score = 0;
let timeRemaining = 10; // Adjust timer duration as needed

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("time-remaining");
const feedbackEl = document.getElementById("feedback");
const finalScoreEl = document.getElementById("final-score");
const nextBtn = document.getElementById("next-btn");

function displayQuestion() {
  const question = questions[currentQuestion];
  questionEl.textContent = question.question;
  optionsEl.innerHTML = ""; // Clear previous options

  question.options.forEach((option, index) => {
    const optionEl = document.createElement("li");
    optionEl.textContent = option;
    optionEl.addEventListener("click", () => checkAnswer(index));
    optionsEl.appendChild(optionEl);
  });

  startTimer();
}

function startTimer() {
  timeRemaining = 10; // Reset timer for each question
  timerEl.textContent = timeRemaining;
  const timerInterval = setInterval(() => {
    timeRemaining--;
    timerEl.textContent = timeRemaining;
    if (timeRemaining === 0) {
      clearInterval(timerInterval);
      checkAnswer(-1); // No answer selected within time limit
    }
  }, 1000);
}

function checkAnswer(selectedOption) {
  const question = questions[currentQuestion];
  if (selectedOption === question.answer) {
    score++;
    feedbackEl.textContent = "Correct!";
  } else {
    feedbackEl.textContent = "Incorrect. The correct answer is " + questions[currentQuestion].options[question.answer];
  }
  showNextButton();
}

function showNextButton() {
  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion === questions.length) {
        clearInterval(timeRemaining);
      showFinalScore();
    } else {
      displayQuestion();
      feedbackEl.textContent = ""; // Clear feedback for next question
      nextBtn.style.display = "none"; // Hide next button until answer is selected
    }
  });
  
  function showFinalScore() {
    finalScoreEl.textContent = "Final Score: " + score + " out of " + questions.length;
    nextBtn.style.display = "none"; // Hide next button after final score
    optionsEl.innerHTML = ""; // Clear options
    questionEl.textContent = "Quiz Finished!";
    // Here's the timer stopping functionality:
    clearInterval(timerInterval); // Clear any existing timer interval
  }
  displayQuestion();