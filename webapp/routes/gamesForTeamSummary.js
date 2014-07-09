/*
 * GET gamesForTeamSummary listing.
 */
var Client = require('node-rest-client').Client;
var CommonURI = "http://127.0.0.1/api/v1/";

exports.list = function (req, res) {
    
    console.log(req.params.championId);
    console.log(req.params.opponentId);
    
    var uri = CommonURI + "games/for_team/summary.json?&access_token=27e2da2dd2d8d456d8b3d1207187f4a0&franchise_abbr=" + req.params.championId;
    var finalUri = uri +"&opp_franchise_abbr=" + req.params.opponentId + "&group=season,team_abbr,opp_abbr&fieldset=basic&max_entries=200";
    
    client = new Client();
    client.get(finalUri, function (data, response) {
        console.log(response);
        res.send(data);
    });
};