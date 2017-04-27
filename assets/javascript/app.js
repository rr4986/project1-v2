// Initialize Firebase
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
//ajax to get sports api data
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

//sports teams typeahead options -- autocompletes search bar
/*var nbaTeams = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('team'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: 'assets/javascript/nba.json'
});

var mlbTeams = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('team'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: 'assets/javascript/mlb.json'
});

var nflTeams = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('team'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: 'assets/javascript/nfl.json'
});

$('#multiple-datasets .typeahead').typeahead({
  highlight: true
},
{
  name: 'nba-teams',
  display: 'team',
  source: nbaTeams,
  templates: {
    header: '<h3 class="league-name">NBA Teams</h3>'
  }
},
{
  name: 'nfl-teams',
  display: 'team',
  source: nflTeams,
  templates: {
    header: '<h3 class="league-name">NFL Teams</h3>'
  }
},
{
  name: 'mlb-teams',
  display: 'team',
  source: mlbTeams,
  templates: {
    header: '<h3 class="league-name">MLB Teams</h3>'
  }
});*/