
// var env = require(".env").config();
// var require
// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var axios = require("axios");
var appSelection = process.argv[2];
var userChoice = process.argv[3];

// if userChoice extends one word
for (var i = 4; i < process.argv.length; i++) {
    userChoice += "+" + process.argv[i];
};


//present directions
// console.log("Welcome to LIRI BOT! To utilize effectively, please follow the follow syntax!");
// console.log("To look up a concert type 'node liri.js concert-this <artist/band name here>'.");
// console.log("To look up a song type 'node liri.js spotify-this-song <song title here>'.");
// console.log("To look up a movie type 'node liri.js movie-this <movie title here>'.");
// console.log("To randomly grab a previous search type 'do-what-it-says'.")
// console.log("To display all previous searches type 'display-all-searches'. Enjoy!");

//switch that runs if user searches a particular thing, spotify, omdb, etc
switch (appSelection) {
    case "concert-this":
        console.log(userChoice);
        break;
    case "spotify-this-song":
        console.log(userChoice);
        break;
    case "movie-this":
        console.log(userChoice);
        getMovie();
        break;
};



//function fetch movie information
function getMovie() {
    //function that appends search information to txt file, include function inside of switch
    axios.get("http://www.omdbapi.com/?t=" + userChoice + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("The movie's rating is: " + response.data.imdbRating);
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
    //function that connects userinput to axios get info to shorten code
}

// function to get bands
function getBands() {
    axios.get("https://rest.bandsintown.com/artists/" + userChoice + "/events?app_id=codingbootcamp").then(
        function (response) {
            console.log("The movie's rating is: " + response.data.imdbRating);
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}