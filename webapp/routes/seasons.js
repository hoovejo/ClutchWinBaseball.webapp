/*
 * GET seasons listing.
 */
var Client = require('node-rest-client').Client;
var CommonURI = "http://127.0.0.1/api/v1/";

exports.list = function (req, res) {
    client = new Client();
    var uri = CommonURI + "seasons.json?&access_token=27e2da2dd2d8d456d8b3d1207187f4a0";
    client.get(uri, function (data, response) {
        console.log(response);
        res.send(data);
    });
};