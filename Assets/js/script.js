
//DOM Elements
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
var timeEl = document.querySelector(".time"); //timer
var scoreboard = document.querySelector(".scoreboard")
var score = document.querySelector(".score")
var initialsInput = document.getElementById("initials") // gets input of initials
var saveButton = document.getElementById("sign-up")

//variables
var secondsLeft = 60
let shuffledQuestions, currentQuestionIndex
var timerInterval

//functions

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  setTime() //starts timer
  scoreboard.classList.add('hide') //removes scoreboard
  incorrect = 0
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide') // hides the next button
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild) // removes the answer you selected 
  }
}

function selectAnswer(e) {
  const selectedButton = e.target // where you click
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  // Array.from(answerButtonsElement.children).forEach(button => {
  //   setStatusClass(button, button.dataset.correct) // not entirely sure 
  // For some reason this code was getting in the way of the decrement
  //operator for when you got a problem wrong
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    questionContainerElement.classList.add('hide'); //ends the game
    console.log("hello")
    clearInterval(timerInterval);
    localStorage.setItem("Time", timeEl.textContent)
    console.log("goodbye")
    scoreboard.classList.remove('hide')
    //window.alert("Sorry! You ran out of time"); 
    //I'll work on getting these to work l8er
    score.textContent = timeEl.textContent
    startButton.innerText = 'Try Again'
    startButton.classList.remove('hide')
    secondsLeft = 60 // resets

  }
}



function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
    secondsLeft = secondsLeft - 10; //decrement when you get an answer wrong
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Coding is fun (T/F)?',
    answers: [
      { text: 'True', correct: true },
      { text: 'False', correct: false }
    ]
  },
  {
    question: 'What type is true/false?',
    answers: [
      { text: 'Boolean', correct: true },
      { text: 'Int', correct: false },
      { text: 'String', correct: false },
      { text: 'Numeric Type', correct: false }
    ]
  },
  {
    question: 'What does JSON stand for?',
    answers: [
      { text: 'JavaScript Operator Notation', correct: false },
      { text: 'JavaScript Object Notation', correct: true },
      { text: 'JavaScript Obstruction Notarization', correct: false },
      { text: 'JavaScript Obliterating Neutron', correct: false }
    ]
  },
  {
    question: 'What is an object?',
    answers: [
      { text: 'A thing', correct: false },
      { text: 'A key-value pair', correct: true }
    ]
  }
]

//Timer

function setTime() {
  // Sets interval in variable
    timeEl.textContent = "60 seconds remaining" //gets rid of text in html before timer decrement is appended
    timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds remaining";

    if (secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      questionContainerElement.classList.add('hide'); //ends the game
      //window.alert("Sorry! You ran out of time"); 
      startButton.innerText = 'Try Again'
      nextButton.classList.add('hide') //this needs to work
      startButton.classList.remove('hide')
      secondsLeft = 60 // resets
      scoreboard.classList.remove('hide')
      score.textContent = timeEl.textContent //shows your score when quiz is finished
      return; 
    } else if (secondsLeft < 0) { //this way it can never be negative
      clearInterval(timerInterval);
      timeEl.textContent = "0 seconds remaining"; //goes to 0 if you run out of time
      questionContainerElement.classList.add('hide'); //ends the game
      //window.alert("Sorry! You ran out of time"); 
      startButton.innerText = 'Try Again'
      nextButton.classList.add('hide')
      startButton.classList.remove('hide')
      secondsLeft = 60 // resets
      scoreboard.classList.remove('hide')
      score.textContent = timeEl.textContent
      return;
    }
    //for the points added and deducted

  }, 1000);
}


//Scoreboard and Local Storage

renderLastRegistered(); //shift + option + down will copy line you are on to next one

function renderLastRegistered() {
  var highScores = document.getElementById("high-scores")
  if (localStorage.getItem("initials")) {
    highScores.innerText= localStorage.getItem("initials") + ": " + localStorage.getItem("Time")
  }
}

saveButton.addEventListener("click", function(event) {
  event.preventDefault();
  if (initialsInput === "") {
    return; // exits the function
  } else {
    localStorage.setItem("initials", initialsInput.value); //stores the intials
    renderLastRegistered();
  }
});

