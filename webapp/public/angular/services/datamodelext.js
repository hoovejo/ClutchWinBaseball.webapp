(function () {
    'use strict';

    // Factory name is handy for logging
    var serviceId = 'datamodelext';

    // Define the factory on the module.
    // Inject the dependencies. 
    // Point to the factory definition function.
    angular.module('app').factory(serviceId,
        ['$filter', datamodelext]);

    function datamodelext($filter) {
        // Define the functions and properties to reveal.
        var service = {
            extFvfResults: extFvfResults,
            extPlayer: extPlayer,
            extPvpResults: extPvpResults,
            extTeam: extTeam,
            extYear: extYear
        };

        return service;

        function extFvfResults(championId, opponentId, data) {
            for (var key in data) {
                var obj = data[key];
                ///search/franchise_vs_franchise_by_year/mussm001/rodra001/2002.json
                obj.drilldown = function () {
                    return championId + '/' + opponentId + '/' + this.season;
                };
            }
        }

        function extPlayer(data) {
            for (var key in data) {
                var obj = data[key];
                obj.displayname = function () {
                    return this.first_name + ' ' + this.last_name;
                };
            }
        }

        function extPvpResults(championId, opponentId, data) {
            for (var key in data) {
                var obj = data[key];
                ///search/player_vs_player_by_year/mussm001/rodra001/2002/regular.json
                obj.drilldown = function () {
                    return championId + '/' + opponentId + '/' + this.season;
                };
            }
        }

        function extTeam(data) {
            for (var key in data) {
                var obj = data[key];
                obj.displayname = function () {
                    return this.location + ' ' + this.name;
                };
            }
        }

        function extYear(data) {
            for (var key in data) {
                var obj = data[key];
                obj.displayname = function () {
                    return this.season;
                };
            }
        }
    }
})();