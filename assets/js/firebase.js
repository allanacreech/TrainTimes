"use strict";
// Initialize Firebase
/*_______________________________________________________________*/
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBCz5SW6mtJcsTWMHmsLK6VY-V7XIqWtw0",
    authDomain: "my-test-project-ecc7a.firebaseapp.com",
    databaseURL: "https://my-test-project-ecc7a.firebaseio.com",
    storageBucket: "my-test-project-ecc7a.appspot.com",
    messagingSenderId: "3331317587"
  };
firebase.initializeApp(config);


// Create a variable to reference the database.
/*_________________________________________________________________*/

var database = firebase.database();


// Initial Values
/*________________________________________________________________*/
var trainName = "";
var destination = "";

var trainTime = 0;
var frequency = 0;




//Capture Button Click
/*________________________________________________________________*/
$("#submitButton").on("click", function(e){
	e.preventDefault();

	//Grabbed values from text boxes
	trainName = $("#trainName").val().trim();
	destination = $("#destination").val().trim();
	trainTime = $("#trainTime").val().trim();
	frequency = parseInt($("#frequency").val().trim());///getting number from string
	console.log(trainTime);


	//Code fro handling the push
	database.ref().push({
		trainName : trainName,
		destination : destination,
		trainTime : trainTime,
		frequency : frequency,
		dateAdded:firebase.database.ServerValue.TIMESTAMP
	})
	// contactForm.reset();//this rests the input form
	
	//Don't refresh the page!
	return false;
});

//Firebase watcher + initial loader

database.ref().on("child_added", function(childAdded){
	var trainName= childAdded.val().trainName;//pulling from database
	var destination = childAdded.val().destination;
	var frequency = childAdded.val().frequency;
	var trainTime = childAdded.val().trainTime;

	// First Time (pushed back 1 year to make sure it comes before current time)
	var trainTimeConverted = moment(trainTime,"HH:mm").subtract(1, "years");
	console.log(trainTimeConverted);

	//Current Time
	var currentTime = moment();
	console.log("CURRENT TIME : " + moment(
		currentTime).format("hh:mm"));

	//Difference between the times
	var diffTime = moment().diff(moment(
		trainTimeConverted),"minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);

	//Time apart(remainder)
	var tRemainder = diffTime % frequency;
	console.log(tRemainder);

	//Minutes Until Train
	var tMinutesTillTrain = frequency - tRemainder;
	console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	//Next Train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm A"));
	var nextTrainTime = moment(nextTrain).format("hh:mm A");

	var oneRow = "<tr>";
	oneRow += "<td>" + trainName + "</td>";
	oneRow += "<td>" + destination + "</td>";
	oneRow += "<td>" + frequency + "</td>";
	oneRow += "<td>" + nextTrainTime + "</td>";
	oneRow += "<td>" + tMinutesTillTrain + "</td>";

	oneRow += "</tr>";
	$("#trainTable").append(oneRow);

//handle the errors
}, function(errorObject){

})





