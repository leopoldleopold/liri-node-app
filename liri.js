// initial variables
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});
var fs = require("fs");
var axios = require("axios");
var appSelection = process.argv[2];
var userChoice = process.argv[3];
// if userChoice extends one word
for (var i = 4; i < process.argv.length; i++) {
    userChoice += "+" + process.argv[i];
};
// variables for saving userInput and requestiong queries!
var saveThis = appSelection + " " + userChoice;
var movieQuery = "http://www.omdbapi.com/?t=" + userChoice + "&y=&plot=short&apikey=trilogy";
var bandQuery = "http://rest.bandsintown.com/artists/" + userChoice + "/events?app_id=codingbootcamp&from=0&to=8";
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
            saveChoice();
            getMusic();
            break;
        case "movie-this":
                saveChoice();
                getMovie();
            break;
        // read random log
        case "do-what-it-says":
            break;
        case "random-history":
            // display previous user search at random from log.txt
            randomHistory();
            break;
    };
};
//function fetch movie information
function getMovie() {
    //function that appends search information to txt file, include function inside of switch
    axios.get(movieQuery).then(
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
    axios.get(bandQuery).then(
        function (response) {
            console.log("Artist: " + response.data[0].artist.name);
            console.log("Venue: " + response.data[0].venue.name);
            console.log("Venue Location: " + response.data[0].venue.city + "," + response.data[0].venue.region);
            console.log(response.data[0].datetime);
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
};
// function to utilize spotify
function getMusic() {
    spotify.search({ type: 'track', query: userChoice, limit: 5 }).then(function (response) {
        console.log("Song Name: " + response.tracks.items[0].name);
        console.log("Album Title: " + response.tracks.items[0].album.name);
        console.log("Preview Link: " + response.tracks.items[0].preview_url);
        console.log("Artist: " + response.tracks.items[0].artists[0].name);
        console.log("Release Date: " + response.tracks.items[0].album.release_date);
    })
        .catch(function (err) {
            console.log(err);
        });
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
    })
};
userSelection();
