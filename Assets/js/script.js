
//DOM Elements
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
var timeEl = document.querySelector(".time"); //timer
var scoreboard = document.querySelector(".scoreboard")
var score = document.querySelector(".score")

//variables
//var secondsLeft = 0;
var secondsLeft = 60
let shuffledQuestions, currentQuestionIndex

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

//let correct, wrong //for timer
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
    answerButtonsElement.removeChild(answerButtonsElement.firstChild) // removes the answer you selected (i think)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target // where you click
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  // Array.from(answerButtonsElement.children).forEach(button => {
  //   setStatusClass(button, button.dataset.correct) // not entirely sure 
  // })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    questionContainerElement.classList.add('hide'); //ends the game
    console.log("hello")
    //timeEl.textContent = "Timer"
    clearInterval(timerInterval);
    localStorage.setItem("Time", timeEl.textContent)
    console.log("goodbye")
    scoreboard.classList.remove('hide')
    //secondsLeft = 0; //returns it to original time
    //var TimeEl = document.getElementById("Timer") // i think it's case sensitive
    //TimeEl.classList.add('hide')
    //questionContainerElement.classList.add('hide'); //ends the game
    //window.alert("Sorry! You ran out of time"); //scoreboard, might have to delete this because it is a nuisance
    startButton.innerText = 'Try Again'
    startButton.classList.remove('hide')
    secondsLeft = 60 // resets
    //clearInterval(timerInterval);
   //secondsLeft = 60; //returns it to original time
    // window.alert(
    //     "Stats:" + "\nWrong: " + incorrect 
    //   ); //scoreboard
  }
}

//let right, incorrect = 0 //my variables for the scoreboard

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    //right++
    //console.log(right)
    element.classList.add('correct')
  } else {
    //incorrect++ //can't seem to get these increment operators to work
    element.classList.add('wrong')
    //console.log(incorrect)
    secondsLeft = secondsLeft - 5; //what the heck, it decrements also when i get it right
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
      { text: 'Yo Mama', correct: false }
    ]
  },
  {
    question: 'Is web development fun?',
    answers: [
      { text: 'Kinda', correct: false },
      { text: 'YES!!!', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false }
    ]
  },
  {
    question: 'CSS stands for Cascading Colored Sheets',
    answers: [
      { text: 'Yes!', correct: false },
      { text: 'Nah bro, but close', correct: true }
    ]
  }
]

//Timer

var timerInterval

function setTime() {
  // Sets interval in variable
    timeEl.textContent = "" //gets rid of text in html
 // it is solely this line of code
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
      return;
    }
    //for the points added and deducted

  }, 1000);
}


//scoreboard

//Local storage
//will be receiving score from variable defined in another function

var initialsInput = document.getElementById("initials") // gets input of initials
var saveButton = document.getElementById("sign-up")
//initialsInput = initialsInput.value //so it doesn't show up as an HTML text area object

renderLastRegistered();



function renderLastRegistered() {
  var highScores = document.getElementById("high-scores")
  highScores.innerText= localStorage.getItem("Time")
}

saveButton.addEventListener("click", function(event) {
  event.preventDefault();
  if (initialsInput === "") {
    return; // exits the function
  } else {
    localStorage.setItem("initials", initialsInput.value); //stores the intials
    //localStorage.setItem("scores", incorrect); //stores the variables
    renderLastRegistered();
  }
});

