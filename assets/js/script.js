// array of question objects
var questions = [ 
	{ 
		prompt: "Inside which HTML element do we put the JavaScript?", 
		options: [ 
			"<javascript>", 
			"<js>", 
			"<script>", 
			"<scripting>", 
		], 
		answer: "<script>", 
	}, 

	{ 
		prompt: "How do you write 'Hello World' in an alert in JavaScript?", 
		options: [ 
			"alert('Hello World')", 
			"msgBox('Hello World')", 
			"alertBox='Hello World'", 
			"alertBox('Hello World')", 
		], 
		answer: "alert('Hello World')", 
	}, 

	{ 
		prompt: "How do you create a function in JavaScript?", 
		options: [ 
			"function:myFunction()", 
			"function=myFunction()", 
			"function myFunction()", 
			"myFunction():function", 
		], 
		answer: "function myFunction()", 
	}, 

	{ 
		prompt: "How do you call a function named 'myFunction'?", 
		options: [
			"call myFunction()", 
			"myFunction()", 
			"call function myFunction", 
			"Call.myFunction()"
		], 
		answer: "myFunction()", 
	}, 

	{ 
		prompt: "How can you add a comment in JavaScript?", 
		options: [ 
			"// comment here", 
			"'comment here", 
			"<!-- comment here -->", 
			"# comment here", 
		], 
		answer: "// comment here", 
	}, 
]; 

// global variables from html defined
var startBtnEl = document.querySelector(".start-btn");
var timerEl = document.querySelector('.timer');
var quizBoxEl = document.querySelector("#quiz-box");
var optionsEl = document.querySelector(".option-list"); 
var feedbackEl = document.querySelector(".feedback");
var startScreenEl = document.querySelector("#startup");
var endScreenEl = document.querySelector("#end");
var initialsEl = document.querySelector("#initials");
var submitBtnEl = document.querySelector("#submit-btn");
var finalScoreEl = document.querySelector("#final-score");

// global variable defined
var currentQuestionIndex = 0;
var time = 89;
var timeInterval;

// timer to start when the "start quiz" button is clicked
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
			choiceBtn.textContent = choice; 
			choiceBtn.onclick = optionsClick; 
			optionsEl.appendChild(choiceBtn); 
		} 
	); 
} 

// controls the behavior of the quiz when an option is clicked
function optionsClick() { 
	// provides feedback as to whether the selected option was correct or not
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

	// sets the currentQuestionIndex +1
    currentQuestionIndex++; 

    if (currentQuestionIndex === questions.length) { 
		// triggers the game over screen when questions run out
    	endQuiz(); 
    } else { 
		// moves the quiz to the next question
    	showQuestions(); 
    } 
} 

// saves score and initials to local storage to be displayed on the highscores page
function submitScore() {
	var initials = initialsEl.value.trim();
	initials = initials.toUpperCase();
	if (initials === "") {
		alert("You must enter initials to save your score.")
	} else {
		var highscores = 
		JSON.parse(window.localStorage.getItem("highscores")) || [];

		var newHighscore = {
			score: time,
			initials: initials,
		};
		highscores.push(newHighscore);
		window.localStorage.setItem("highscores", JSON.stringify(highscores));
		window.location.href = "highscore.html";
	}
}

// game over 
function endQuiz() {
	// makes the score the amount of time left
    var score = time;
	// stops the timer
    clearInterval(timeInterval);
	// hides the quizbox and shows the end screen
    endScreenEl.removeAttribute("class");
	quizBoxEl.setAttribute("class", "hide");
	// shows the player their score
	finalScoreEl.textContent = score;
}


function startGame() {
	// hides the start screen and shows quizbox
	startScreenEl.setAttribute("class", "hide");
	quizBoxEl.removeAttribute("class");
    showTimer();
    showQuestions();
}

// listens for click on the start button
startBtnEl.addEventListener("click", startGame);

// listens for click on the submit button
submitBtnEl.addEventListener("click", submitScore);