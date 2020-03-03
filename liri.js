// var require
require("dotenv").config();
var keys = require("./keys.js");
// var Spotify = require('node-spotify-api');
// var spotify = new Spotify({
//     id: keys.id,
//     secret: keys.secret
// });
// console.log(spotify);
var fs = require("fs");
var axios = require("axios");
var appSelection = process.argv[2];
var userChoice = process.argv[3];
// console.log(saveThis);
// if userChoice extends one word
for (var i = 4; i < process.argv.length; i++) {
    userChoice += "+" + process.argv[i];
};
var saveThis = appSelection + " " + userChoice;
// function to append userChoice to log
function saveChoice() {
    fs.appendFile("log.txt", saveThis + "\n", function (err) {
        if (err) {
            console.log(err);
        }
        else {
            // console.log("Content Added!");
        }
    });
};


//switch that runs if user searches a particular thing, spotify, omdb, etc
function userSelection() {

    switch (appSelection) {
        case "concert-this":
            saveChoice();
            getBands();
            break;
        case "spotify-this-song":
            userChoice += "'" + userChoice + "'";
            saveChoice();
            getMusic();
            break;
        case "movie-this":
            if (userChoice === false) {
                userchoice = "mr.nobody";
                yearHolder = "2009";
            }
            saveChoice();
            getMovie();
            break;
        // read random log
        case "do-what-it-says":
            break;
        // 
        case "random-history":
            // display previous user search at random from log.txt
            randomHistory();
            break;

    };
};
//function fetch movie information
function getMovie() {
    //function that appends search information to txt file, include function inside of switch
    axios.get("http://www.omdbapi.com/?t=" + userChoice + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("Movie Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Produced in: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        })
        .catch(function (error) {
            if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}
// function to get bands
function getBands() {
    axios.get("http://rest.bandsintown.com/artists/" + userChoice + "/events?app_id=codingbootcamp").then(
        function (response) {
            // date.moment().subtract(10, 'days').calendar() = response.data.datetime;
            // // console.log("The movie's rating is: " + response.data.imdbRating);
            console.log("Concert Venue: " + response.data.venue);
            // // console.log("Venue Location: " + response.data.venue);
            // console.log("Date of Event: " + date);
            console.log(response);

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
// function to utilize spotify
function getMusic() {
    spotify
        .search({ type: 'track', query: userChoice })
        .then(function (data) {
            console.log(data);
        })
};
// function to randomly draw from user history at random
function randomHistory() {
    fs.readFile("log.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        var history = data.split("\n");
        var i = Math.floor(Math.random() * history.length);
        console.log(history[i]);
        // userSelection();
    })
};
userSelection();
// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }




                    // console.log(spotify)
                    //present directions
                    // console.log("Welcome to LIRI BOT! To utilize effectively, please follow the follow syntax!");
                    // console.log("To look up a concert type 'node liri.js concert-this <artist/band name here>'.");
                    // console.log("To look up a song type 'node liri.js spotify-this-song <song title here>'.");
                    // console.log("To look up a movie type 'node liri.js movie-this <movie title here>'.");
                    // console.log("To randomly grab a previous search type 'do-what-it-says'.")
                    // console.log("To display all previous searches type 'display-all-searches'. Enjoy!");