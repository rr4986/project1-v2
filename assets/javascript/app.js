///////////////////////////
// Initialize Firebase/////
///////////////////////////
var config = {
  apiKey: "AIzaSyBVdl2rA2nKOz4OSGuftySdI4B9mvAfPQ4",
  authDomain: "second-screen-sports.firebaseapp.com",
  databaseURL: "https://second-screen-sports.firebaseio.com",
  projectId: "second-screen-sports",
  storageBucket: "second-screen-sports.appspot.com",
  messagingSenderId: "910265912496"
};
firebase.initializeApp(config);

//variable to reference database
var database = firebase.database();

//database values
var league = "";
var city = "";
var team = "";

//store user input in database
$("#search-term").on("click", function() {
  league = $("#search").val().trim();
  city = $("#search").val().trim();
  team = $("#search").val().trim();

  database.ref().set({
    league: league,
    city: city,
    team: team,
  });

});


//vars for queryUrl parameters

var todayDate = moment().format("YYYY" + "MM" + "DD");
var customDate = "20170425"
var awayTeam = "SAS";
var homeTeam = "MEM";

console.log(todayDate);


//////////////////////////////////
//ajax to get sports api data/////
//////////////////////////////////



var queryUrl = "https://www.mysportsfeeds.com/api/feed/pull/nba/2017-playoff/game_boxscore.json?gameid=" + customDate + "-MEM-SAS&teamstats=W,L,PTS,PTSA&playerstats=2PA,2PM,3PA,3PM,FTA,FTM";

$.ajax({
  method: "GET",
  url: queryUrl,
  dataType: 'json',
  headers: {
    "Authorization": "Basic " + btoa("joecabralez" + ":" + "twattwat!3")
  },
}).done(function(SportsData) {
  console.log("------------------------");
  console.log(SportsData);
  console.log(SportsData.gameboxscore);
  //log away team city
  console.log(SportsData.gameboxscore.game.awayTeam.City);
  //log away team name
  console.log(SportsData.gameboxscore.game.awayTeam.Name);
  //log away team points
  console.log(SportsData.gameboxscore.quarterSummary.quarterTotals.awayScore);
  //log home team city
  console.log(SportsData.gameboxscore.game.homeTeam.City);
  //log home team name
  console.log(SportsData.gameboxscore.game.homeTeam.Name);
  //log home team points
  console.log(SportsData.gameboxscore.quarterSummary.quarterTotals.homeScore);
  
  //print game stats to page
  var awayTeamCity = SportsData.gameboxscore.game.awayTeam.City
  var awayTeamName = SportsData.gameboxscore.game.awayTeam.Name
  var awayTeamScore = SportsData.gameboxscore.quarterSummary.quarterTotals.awayScore
  
  var homeTeamCity = SportsData.gameboxscore.game.homeTeam.City
  var homeTeamName = SportsData.gameboxscore.game.homeTeam.Name
  var homeTeamScore = SportsData.gameboxscore.quarterSummary.quarterTotals.homeScore
 
  $("#away-team-city").html(awayTeamCity);
  $("#away-team-name").html(awayTeamName);
  $("#away-team-score").html(awayTeamScore);
  
  $("#home-team-city").html(homeTeamCity);
  $("#home-team-name").html(homeTeamName);
  $("#home-team-score").html(homeTeamScore);



});


////////////////////////////////////////////
/////WIKIPEDIA FUNCTION WITH AJAX CALL//////
////////////////////////////////////////////

var searchData = "";


function wikipediaBox(search) {
 var RRsearchKey = search;
 var RRqueryURL = "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page="+RRsearchKey+"&callback=?";
    $.ajax({
        type: "GET",
        url: RRqueryURL,
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data) {

          console.log(data);
 
            var markup = data.parse.text["*"];
            var blurb = $('<div></div>').html(markup);
 
            // remove links as they will not work
            blurb.find('a').each(function() { $(this).replaceWith($(this).html()); });
   

            $('#wikipedia').html($(blurb).find('p'));
 
        },
        error: function (errorMessage) {
        }
    });
}

////////////////////////////////////////
/////GIPHY FUNCTION WITH AJAX CALL//////
////////////////////////////////////////

function displayGifs() {
    
    //the URL to search the site and grab 10 results
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchData + "&api_key=dc6zaTOxFJmzC&limit=10";

    //ajax function that gets a response from the site
    $.ajax({
      url: queryURL,
      method:"GET",
    }).done(function(response) {
      console.log(response);
      for (var i = 0; i < response.data.length; i++) {
        var gifs = response.data[i].images.downsized.url;
      }
      $("#gifs").append("<img src='" + gifs + " '>");
            
    });
};

$("#search").on("click", function(event) {
    
    event.preventDefault();
    searchData = $("#search-term").val().trim();
    
    console.log(searchData);
    displayGifs();
    wikipediaBox(searchData);
})

