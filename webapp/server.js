
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser')
var morgan = require('morgan')

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(morgan('dev'));
app.use(bodyParser.json());

/*
var BundleUp = require('bundle-up2'), 
    assets = require('./assets');

BundleUp(app, assets, {
    staticRoot: __dirname + '/public/',

    staticUrlRoot: '/',
    bundle: true,
    minifyCss: true,
    minifyJs: true,
    complete: console.log.bind(console, "Bundle-up: static files are minified/ready")
});
*/

app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  //app.use(express.errorHandler());
}

var router = express.Router();
// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Request received');
    next(); // make sure we go to the next routes and don't stop here
});

// /index.html
router.get('/', routes.index);

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api/v1
app.use('/api/v1', router);

// on routes that end in /franchises
// ----------------------------------------------------
var franchises = require('./routes/franchises');
router.get('/franchises', franchises.list);
// ----------------------------------------------------
// on routes that end in /gamesForTeamSummary/:franchiseId/:opponentId
// ----------------------------------------------------
var gamesForTeamSummary = require('./routes/gamesForTeamSummary');
router.get('/gamesForTeamSummary/:championId/:opponentId', gamesForTeamSummary.list);
// ----------------------------------------------------
// on routes that end in /gamesForTeamSummary/:franchiseId/:opponentId/:seasonId
// ----------------------------------------------------
var gamesForTeam = require('./routes/gamesForTeam');
router.get('/gamesForTeam/:championId/:opponentId/:seasonId', gamesForTeam.list);

// ----------------------------------------------------
// on routes that end in /seasons
// ----------------------------------------------------
var seasons = require('./routes/seasons');
router.get('/seasons', seasons.list);
// ----------------------------------------------------
// on routes that end in /teams/:seasonId
// ----------------------------------------------------
var teams = require('./routes/teams');
router.get('/teams/:seasonId', teams.list);
// ----------------------------------------------------
// on routes that end in /players/:teamId/:seasonId
// ----------------------------------------------------
var players = require('./routes/players');
router.get('/players/:teamId/:seasonId', players.list);
// ----------------------------------------------------
// on routes that end in /pitchers/:batterId/:seasonId
// ----------------------------------------------------
var pitchers = require('./routes/pitchers');
router.get('/pitchers/:batterId/:seasonId', pitchers.list);
// ----------------------------------------------------
// on routes that end in /playerEventsSummary/:batterId/:pitcherId
// ----------------------------------------------------
var playerEventsSummary = require('./routes/playerEventsSummary');
router.get('/playerEventsSummary/:batterId/:pitcherId', playerEventsSummary.list);
// ----------------------------------------------------
// on routes that end in /playerEvents/:batterId/:pitcherId/:seasonId
// ----------------------------------------------------
var playerEvents = require('./routes/playerEvents');
router.get('/playerEvents/:batterId/:pitcherId/:seasonId', playerEvents.list);



var fs = require('fs');
fs.writeFile("/var/run/webapp.pid", process.pid);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


