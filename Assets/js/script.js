/*Tonight I'm just going to figure out the scoreboard, but I still can't figure out
exactly how to decrement time and in general just make the timer look better
 I also have to format everything else and make
it look better. */

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  setTime() //starts timer
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

let correct, wrong //for timer
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
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    questionContainerElement.classList.add('hide'); //ends the game
    timeEl.textContent = "Timer"
    secondsLeft = 1 //so it doesn't count down
    //clearInterval(timerInterval);
   //secondsLeft = 60; //returns it to original time
    // window.alert(
    //     "Stats:" + "\nWrong: " + incorrect 
    //   ); //scoreboard
    startButton.innerText = 'Try Again'
    startButton.classList.remove('hide')
  }
}

let right, incorrect = 0 //my variables for the scoreboard

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    right++
    console.log(right)
    element.classList.add('correct')
  } else {
    incorrect++ //can't seem to get these increment operators to work
    element.classList.add('wrong')
    console.log(incorrect)
    //secondsLeft -= 30; //what the heck
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
var timeEl = document.querySelector(".time");

var secondsLeft = 0;

function setTime() {
  // Sets interval in variable
    timeEl.textContent = "" //gets rid of text in html
    secondsLeft = 20; // it is solely this line of code
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft + "remaining";

    if (secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      secondsLeft = 0; //returns it to original time
      //var TimeEl = document.getElementById("Timer") // i think it's case sensitive
      //TimeEl.classList.add('hide')
      questionContainerElement.classList.add('hide'); //ends the game
      //window.alert("Sorry! You ran out of time"); //scoreboard, might have to delete this because it is a nuisance
      startButton.innerText = 'Try Again'
      startButton.classList.remove('hide')
      // Calls function to create and append image
  
      return;
    }
    //for the points added and deducted

  }, 1000);
}

//scoreboard

//Local storage
//will be receiving score from variable defined in another function

var initialsInput = document.getElementById("initials") // gets input of initials

renderLastRegistered();



function renderLastRegistered() {
  var highScores = document.getElementById("high-scores")
  highScores.value = localStorage.getItem("initials")
}

saveButton.addEventListener("click", function(event) {
  event.preventDefault();
  if (initialsInput === "") {
    return; // exits the function
  } else {
    localStorage.setItem("initials", initialsInput); //stores the intials
    //localStorage.setItem("scores", incorrect); //stores the variables
    renderLastRegistered();
  }
});

