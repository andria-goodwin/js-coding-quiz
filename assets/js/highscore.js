// script.js 


// // Get Dom Elements 

// let questionsEl = 
// 	document.querySelector( 
// 		"#questions"
// 	); 
// let timerEl = 
// 	document.querySelector("#timer"); 
// let choicesEl = 
// 	document.querySelector("#options"); 
// let submitBtn = document.querySelector( 
// 	"#submit-score"
// ); 
// let startBtn = 
// 	document.querySelector("#start"); 
// let nameEl = 
// 	document.querySelector("#name"); 
// let feedbackEl = document.querySelector( 
// 	"#feedback"
// ); 
// let reStartBtn = 
// 	document.querySelector("#restart"); 

// // Quiz's initial state 
// let currentQuestionIndex = 0; 
// let time = questions.length * 15; 
// let timerId; 

// // Start quiz and hide frontpage 

// function quizStart() { 
// 	timerId = setInterval( 
// 		clockTick, 
// 		1000 
// 	); 
// 	timerEl.textContent = time; 
// 	let landingScreenEl = 
// 		document.getElementById( 
// 			"start-screen"
// 		); 
// 	landingScreenEl.setAttribute( 
// 		"class", 
// 		"hide"
// 	); 
// 	questionsEl.removeAttribute( 
// 		"class"
// 	); 
// 	getQuestion(); 
// } 


// // End quiz by hiding questions, 
// // Stop timer and show final score 

// function quizEnd() { 
// 	clearInterval(timerId); 
// 	let endScreenEl = 
// 		document.getElementById( 
// 			"quiz-end"
// 		); 
// 	endScreenEl.removeAttribute( 
// 		"class"
// 	); 
// 	let finalScoreEl = 
// 		document.getElementById( 
// 			"score-final"
// 		); 
// 	finalScoreEl.textContent = time; 
// 	questionsEl.setAttribute( 
// 		"class", 
// 		"hide"
// 	); 
// } 

// // End quiz if timer reaches 0 

// function clockTick() { 
// 	time--; 
// 	timerEl.textContent = time; 
// 	if (time <= 0) { 
// 		quizEnd(); 
// 	} 
// } 

// // Save score in local storage 
// // Along with users' name 

// function saveHighscore() { 
// 	let name = nameEl.value.trim(); 
// 	if (name !== "") { 
// 		let highscores = 
// 			JSON.parse( 
// 				window.localStorage.getItem( 
// 					"highscores"
// 				) 
// 			) || []; 
// 		let newScore = { 
// 			score: time, 
// 			name: name, 
// 		}; 
// 		highscores.push(newScore); 
// 		window.localStorage.setItem( 
// 			"highscores", 
// 			JSON.stringify(highscores) 
// 		); 
// 		alert( 
// 			"Your Score has been Submitted"
// 		); 
// 	} 
// } 

// // Save users' score after pressing enter 

// function checkForEnter(event) { 
// 	if (event.key === "Enter") { 
// 		saveHighscore(); 
// 		alert( 
// 			"Your Score has been Submitted"
// 		); 
// 	} 
// } 
// nameEl.onkeyup = checkForEnter; 

// // Save users' score after clicking submit 

// submitBtn.onclick = saveHighscore; 

// // Start quiz after clicking start quiz 

// startBtn.onclick = quizStart;
