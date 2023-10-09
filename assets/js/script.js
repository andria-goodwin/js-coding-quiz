var questions = [ 
	{ 
		prompt: `Inside which HTML 
				element do we put 
				the JavaScript?`, 
		options: [ 
			"<javascript>", 
			"<js>", 
			"<script>", 
			"<scripting>", 
		], 
		answer: "<script>", 
	}, 

	{ 
		prompt: `How do you call a 
				function named 
				myFunction?`, 
		options: [ 
			"call myFunction()", 
			"myFunction()", 
			"call function myFunction", 
			"Call.myFunction", 
		], 
		answer: "myFunction()", 
	}, 

	{ 
		prompt: `How does a for loop 
				start?`, 
		options: [ 
			"for (i = 0; i <= 5; i++)", 
			"for (i = 0; i <= 5)", 
			"for i = 1 to 5", 
			" for (i <= 5; i++)", 
		], 
		answer: "for (i = 0; i <= 5; i++)", 
	}, 

	{ 
		prompt: `In JavaScript, which 
				of the following is 
				a logical operator?`, 
		options: ["|", "&&", "%", "/"], 
		answer: "&&", 
	}, 

	{ 
		prompt: `A named element in a 
				JavaScript program that 
				is used to store and 
				retrieve data is a _____.`, 
		options: [ 
			"method", 
			"assignment operator", 
			"letiable", 
			"string", 
		], 
		answer: "letiable", 
	}, 
]; 

var startBtnEl = document.querySelector(".start-btn");
var timerEl = document.querySelector('.timer');
var quizBoxEl = document.querySelector("#quiz-box");
var optionsEl = document.querySelector(".option-list"); 
var feedbackEl = document.querySelector(".feedback");
var startScreenEl = document.querySelector(".startup");
var endScreenEl = document.querySelector("#end");
var initialsEl = document.querySelector("#initials");
var submitBtnEl = document.querySelector("#submit-btn");
var finalScoreEl = document.querySelector("#final-score");

var currentQuestionIndex = 0;
var time = 90;
var timeInterval;

function showTimer() {  
    timeInterval = setInterval(function () {
      if (time > 1) {
        timerEl.textContent = "Time: " + time;
        time--;
      } else {
        timerEl.textContent = '';
        endQuiz();
      }
    }, 1000);
  }

// Loop through array of questions and 
// Answers and create list with buttons 
function showQuestions() { 
	var currentQuestion = questions[currentQuestionIndex]; 
	var promptEl = document.querySelector(".question-text"); 
	promptEl.textContent = currentQuestion.prompt; 
	optionsEl.innerHTML = ""; 
	currentQuestion.options.forEach( 
		function (choice, i) { 
			var choiceBtn = document.createElement("button"); 
			choiceBtn.setAttribute("value", choice); 
			choiceBtn.textContent = i + 1 + ". " + choice; 
			choiceBtn.onclick = optionsClick; 
			optionsEl.appendChild(choiceBtn); 
		} 
	); 
} 

function optionsClick() { 
    if (this.value !== questions[currentQuestionIndex].answer) { 
    	time -= 10; 
    	if (time < 0) { 
    		time = 0; 
    	} 
    	timerEl.textContent = time; 
    	feedbackEl.textContent = "Incorrect."; 
    	feedbackEl.style.color = "red"; 
    } else { 
    	feedbackEl.textContent = "Correct!"; 
    	feedbackEl.style.color = "green"; 
    } 
    feedbackEl.setAttribute("class", "feedback"); 
    setTimeout(function () { 
    	feedbackEl.setAttribute("class", "feedback hide"); 
    }, 2000); 
    currentQuestionIndex++; 
    if (currentQuestionIndex === questions.length) { 
    	endQuiz(); 
    } else { 
    	showQuestions(); 
    } 
} 

function submitScore() {
	var initials = initialsEl.value.trim();
	if (initials !== "") {
		var highscores = 
		JSON.parse(window.localStorage.getItem("highscores")) || [];

		var newHighscore = {
			score: time,
			initials: initials,
		};
		highscores.push(newHighscore);
		window.localStorage.setItem("highscores", JSON.stringify(highscores));
	}
}

function endQuiz() {
    var score = time;
    // alert("Game Over! You scored " + score + ".");
    clearInterval(timeInterval);
    endScreenEl.removeAttribute("class");
	quizBoxEl.setAttribute("class", "hide");
	finalScoreEl.textContent = score;
}


function startGame() {
	startScreenEl.setAttribute("class", "hide");
	quizBoxEl.removeAttribute("class");
    showTimer();
    showQuestions();
}

// Add event listener to generate button
startBtnEl.addEventListener("click", startGame);

submitBtnEl.addEventListener("click", submitScore);