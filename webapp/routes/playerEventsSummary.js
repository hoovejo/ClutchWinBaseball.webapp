
/*
 * GET playersEventsSummary listing.
 */
var Client = require('node-rest-client').Client;
var CommonURI = "http://127.0.0.1/api/v1/";

exports.list = function (req, res) {
    
    console.log(req.params.batterId);
    console.log(req.params.pitcherId);
    
    var uri = CommonURI + "events/summary.json?&access_token=27e2da2dd2d8d456d8b3d1207187f4a0&group=season";
    var finalUri = uri + "&bat_id=" + req.params.batterId + "&pit_id=" + req.params.pitcherId;
   
    client = new Client();
    client.get(finalUri, function (data, response) {
        console.log(response);
        res.send(data);
    });
};
