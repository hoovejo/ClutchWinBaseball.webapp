
/*
 * GET players listing.
 */
var Client = require('node-rest-client').Client;
var CommonURI = "http://127.0.0.1/api/v1/";

exports.list = function (req, res) {
    
    console.log(req.params.teamId);
    console.log(req.params.seasonId);
    
    var uri = CommonURI + "players.json?&access_token=27e2da2dd2d8d456d8b3d1207187f4a0&team_abbr="+ req.params.teamId +"&season=" + req.params.seasonId;
    
    client = new Client();
    client.get(uri, function (data, response) {
        console.log(response);
        res.send(data);
    });
};
