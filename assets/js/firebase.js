// Initialize Firebase
/*_______________________________________________________________*/
var config = {
	apiKey: "AIzaSyDxQqkGa3AKrcGmGVFalJe40g4hdzADf6w",
	authDomain: "coder-bay-views.firebaseapp.com",
	databaseURL: "https://coder-bay-views.firebaseio.com",
	storageBucket: "coder-bay-views.appspot.com",
};
firebase.initializeApp(config);


// Create a variable to reference the database.
/*_________________________________________________________________*/

var database = firebase.database();


// Initial Values
/*________________________________________________________________*/
var trainSearch = "No Train :-(";
var destination = "No destination :-(";

var trainTime = 0;
var frequency = 0;




//Get initial values
/*________________________________________________________________*/
