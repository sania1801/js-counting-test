const numQuestions = 3;
let currentQuestion = 0;
let correctAnswers = 0;
let a, b;
let startTime;
let timings = [];

const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const feedbackEl = document.getElementById("feedback");
const resultsEl = document.getElementById("results");
const startButton = document.getElementById("startButton");
const submitButton = document.getElementById("submitButton");

startButton.addEventListener("click", startTest);
submitButton.addEventListener("click", checkAnswer);
answerEl.addEventListener("keypress", (e) => {
  if (e.key === "Enter") checkAnswer();
});

function startTest() {
  currentQuestion = 0;
  correctAnswers = 0;
  timings = [];
  resultsEl.innerHTML = "";
  feedbackEl.textContent = "";
  answerEl.disabled = false;
  submitButton.disabled = false;
  startButton.disabled = true;
  answerEl.value = "";
  nextQuestion();
}

function nextQuestion() {
  if (currentQuestion >= numQuestions) {
    finishTest();
    return;
  }
  
  a = getRandomTwoDigit();
  b = getRandomTwoDigit();
  questionEl.textContent = `Вопрос ${currentQuestion + 1}: Сколько будет ${a} × ${b}?`;
  answerEl.value = "";
  answerEl.focus();
  startTime = new Date();
}

function checkAnswer() {
  const userAnswer = parseInt(answerEl.value);
  if (isNaN(userAnswer)) return;
  
  const endTime = new Date();
  const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
  const correct = userAnswer === a * b;
  
  if (correct) correctAnswers++;
  feedbackEl.textContent = correct ? "Верно!" : `Неверно. ${a} × ${b} = ${a * b}`;
  
  timings.push({
    question: `${a} × ${b}`,
    userAnswer,
    correctAnswer: a * b,
    correct,
    time: timeTaken,
  });
  
  currentQuestion++;
  
  setTimeout(() => {
    feedbackEl.textContent = "";
    nextQuestion();
  }, 1000);
}

function finishTest() {
  answerEl.disabled = true;
  submitButton.disabled = true;
  startButton.disabled = false;
  questionEl.textContent = "Тест завершён!";
  
  let totalTime = 0;
  resultsEl.innerHTML = `<h3>Результаты:</h3><ul>`;
  timings.forEach((t, i) => {
    resultsEl.innerHTML += `
      <li>
        ${i + 1}) ${t.question} = ${t.correctAnswer},
        ваш ответ: ${t.userAnswer}
        (${t.correct ? "✅" : "❌"}),
        время: ${t.time} сек
      </li>`;
    totalTime += parseFloat(t.time);
  });
  resultsEl.innerHTML += `</ul><p>Среднее время: ${(totalTime / timings.length).toFixed(2)} сек</p>`;
}

function getRandomTwoDigit() {
  return Math.floor(Math.random() * 90) + 10; // от 10 до 99
}
