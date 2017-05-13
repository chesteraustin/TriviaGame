$(document).ready(function(){
	//Initialize screen by hiding timer and question containers
//	$("#timerContainer").toggle();
//	$("#questionContainer").toggle();
	var questionNumber = 0;
	var score = 0;

	//Start Game
	$("#startGame").on("click", function(){
		startGame();
	})

	//Select Answer
	$(".answerListContainer").on("click", function(){
		var answerSelected = $(this).children().attr("data-answer");
		var correctAnswer = $("#hiddenAnswer").val();
		console.log(answerSelected)
		console.log(correctAnswer)

		if (correctAnswer == answerSelected){
			questionNumber++;
			score++;
//			countDown("stop");

			$("#score").html(score);

			console.log("correct")
			//answer is correct

			//clear questions
			$("#question").empty();
			//clear answers
			$(".answerListContainer").empty();

			//show next question
			displayQuestion(questionNumber);
			startGame();

		}
		else {
			console.log("incorrect")
		}
	})
})

function startGame(){
	var questions;
	//Start countdown
	countDown("start", 3);

	setTimeout(function(){
		countDown("stop");
		displayQuestion(0);
		countDown("start", 10);
		setTimeout(function(){
			countDown("stop");
		}, 10000);
	}, 3000);

	//Show timer
	$("#timerContainer").toggle();
}

function countDown(option, countdownTime) {
	var timer = {
		time: countdownTime,
		start: function() {
			intervalId = setInterval(timer.counter, 1000);
		},
		stop: function() {
			clearInterval(intervalId);
		},
		counter: function() {
			timer.time--;
			console.log(timer.time);
			$("#timer").text(timer.time)
			if (timer.time == 0) {
				clearInterval(intervalId);			
			}
		}
	}

	if (option == "start") {
		timer.start(countdownTime);
	}
	else if (option == "stop") {
		timer.stop();
		console.log("time up");
	}
}

function displayQuestion(questionNumber) {
	//Get Question
	var questionNumber = questionNumber;
	$.ajax({
		type: "GET",
		url: "assets/javascript/questions.json"
	}).done(function(response){
		console.log("in AJAX = ", questionNumber)
		myQuestion = response;
		var questionText = myQuestion.questions[questionNumber].questionText;
		console.log(questionText)
		if ($("#questionContainer").not(":visible")) {
			$("#questionContainer").show();
		}
		if ($("#answersContainer").not(":visible")) {
			$("#answersContainer").toggle();
		}

		$("#question").text(questionText);

		for (var i = 0; i < myQuestion.questions[questionNumber].possibleAnswers.length; i++){
			var j = i+1;
			var answerList = $("#al" + j);
			answerItem = $("<li>" + myQuestion.questions[questionNumber].possibleAnswers[i] + "</li>");
			answerItem.attr("data-answer", i+1);
			answerItem.addClass("answers");
			answerList.append(answerItem)
		}

		//Save answer to input element
		var correctAnswer = myQuestion.questions[questionNumber].correctAnswer
		$("#hiddenAnswer").val(correctAnswer);
	});
}


//  Our stopwatch object.
var stopwatch = {
	time: 0,
	reset: function() {
		stopwatch.time = 0;
		stopwatch.lap = 1;
		//  TODO: Change the "display" div to "00:00."
		$("#display").html("00:00");
	},
	start: function() {
		intervalId = setInterval(stopwatch.count, 1000);
	},
	stop: function() {
		clearInterval(intervalId);
	},
	recordLap: function() {
	},
	count: function() {
		stopwatch.time++;
		var currentTime = stopwatch.timeConverter(stopwatch.time)
//		console.log(currentTime)
		$("#display").html(currentTime)
	},
	timeConverter: function(t) {
		//  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
		var minutes = Math.floor(t / 60);
		var seconds = t - (minutes * 60);

		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		if (minutes === 0) {
			minutes = "00";
		}
		else if (minutes < 10) {
			minutes = "0" + minutes;
		}
		return minutes + ":" + seconds;
	}
};