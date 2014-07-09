(function () {
    'use strict';

    var app = angular.module('app');

    app.factory('stateservice', function () {
        return {
            champions: [],
            opponents: [],
        };
    });

    // Factory name is handy for logging
    var serviceId = 'statemanager';
    // Define the factory on the module.
    // Inject the dependencies. 
    // Point to the factory definition function.
    app.factory(serviceId,
        ['collection', 'common', 'config', 'httpApi', 'resourceApi', statemanager]);

    function statemanager(collection, common, config, httpApi, resourceApi) {

        var $q = common.$q;

        // Define the functions and properties to reveal.
        var service = {
            getFranchiseList: getFranchiseList,
            getTeamsByYearList: getTeamsByYearList,
            getYearList: getYearList,
            primeFranchiseList: primeFranchiseList,
            primeYearList: primeYearList
        };

        return service;

        function getFranchiseList() {
            return collection.get(config.appStrings.franchises);
        }

        function getTeamsByYearList(yearId) {

            var deferred = $q.defer();
            var key = yearId + config.appStrings.teamlist;
            var result = collection.get(key);

            if (result == null) {
                httpApi.getTeams(yearId).then(function (successData) {
                    collection.set(key, successData);
                    deferred.resolve(successData);
                }).catch(function (status) {
                    deferred.reject(status);
                });
            } else {
                deferred.resolve(result);
            }
            return deferred.promise;
        }

        function getYearList() {
            return collection.get(config.appStrings.years);
        }

        function primeFranchiseList() {
            var deferred = $q.defer();
            resourceApi.franchises().then(function (successData) {
                collection.set(config.appStrings.franchises, successData);
                deferred.resolve(successData);
            }).catch(function(status){
				deferred.reject(status);
            });
            return deferred.promise;
        }

        function primeYearList() {
            var deferred = $q.defer();
            httpApi.getYears().then(function (successData) {
                collection.set(config.appStrings.years, successData);
                deferred.resolve(successData);
            }).catch(function(status){
				deferred.reject(status);
            });
            return deferred.promise;
        }
    }
})();
