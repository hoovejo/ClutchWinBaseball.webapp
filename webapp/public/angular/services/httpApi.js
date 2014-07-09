(function () {
    'use strict';

    var app = angular.module('app');

    app.factory('httpApi',
        ['$http', 'common', 'config', 'datamodelext', httpApi]);

    function httpApi($http, common, config, datamodelext) {

        var $q = common.$q;
        var rc = config.remoteServiceNames;

        return {
            getBatters: function (teamId, yearId) {
                var url = rc.rosterSearch + teamId + '/' + yearId;
                var deferred = $q.defer();
                $http.get(url).success(function (data, status, headers, config) {
                    datamodelext.extPlayer(data);
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

                return deferred.promise;
            },
            getOpponentsForBatter: function (selectedYear, batterId) {
                var url = rc.opponentsForBatter + batterId + '/' + selectedYear;
                var deferred = $q.defer();
                $http.get(url).success(function (data, status, headers, config) {
                    datamodelext.extPlayer(data);
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

                return deferred.promise;
            },
            getTeams: function (yearId) {
                var url = rc.teams + yearId + rc.jsonSuffix;
                var deferred = $q.defer();
                $http.get(url).success(function (data, status, headers, config) {
                    datamodelext.extTeam(data);
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

                return deferred.promise;
            },
            getYears: function () {
                var url = rc.years;
                var deferred = $q.defer();
                $http.get(url).success(function (data, status, headers, config) {
                    datamodelext.extYear(data);
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

                return deferred.promise;
            },
            runFvFSearch: function (championId, opponentId) {
                var url = rc.franchiseSearch + championId + '/' + opponentId;
                var deferred = $q.defer();
                $http.get(url).success(function (data, status, headers, config) {
                    console.log(data);
                    datamodelext.extFvfResults(championId, opponentId, data);
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(status);
                    deferred.reject(status);
                });

                return deferred.promise;
            },
            runFvFByYearSearch: function (params) {
                ///search/franchise_vs_franchise_by_year/mussm001/rodra001/2002.json
                var url = rc.franchiseYearSearch + params;
                console.log(url);
                var deferred = $q.defer();
                $http.get(url).success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

                return deferred.promise;
            },
            runPvPSearch: function (championId, opponentId) {
                var url = rc.playerPlayerSearch + championId + '/' + opponentId;
                var deferred = $q.defer();
                $http.get(url).success(function (data, status, headers, config) {
                    datamodelext.extPvpResults(championId, opponentId, data);
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

                return deferred.promise;
            },
            runPvPByYearSearch: function (params) {
                ///search/player_vs_player_by_year/mussm001/rodra001/2002/regular.json
                var url = rc.playerPlayerYearSearch + params;
                var deferred = $q.defer();
                $http.get(url).success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

                return deferred.promise;
            }
        }
    }
})();
