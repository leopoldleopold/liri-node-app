// require(".env").config();
// var require
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var fs = require("fs");

var appSelection = process.argv[2];
var userChoice = process.argv[3];

for (var i = 4; i < process.argv.length; i++) {
    userChoice += "+"+ process.argv[i];
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
        break;
};

//function that appends search information to txt file, include function inside of switch

//function that connects userinput to axios get info to shorten code