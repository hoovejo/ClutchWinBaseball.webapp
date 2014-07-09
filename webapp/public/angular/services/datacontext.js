(function () {
    'use strict';

    var serviceId = 'datacontext';
    angular.module('app').factory(serviceId,
        ['common', 'config', 'statemanager', 'httpApi', datacontext]);

    function datacontext(common, config, statemanager, httpApi) {
        var $q = common.$q;
        var primePromise;

        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(serviceId);
        var selectedYear = '';

        var service = {
            appPrime: appPrime,
            getBattersByTeamYear: getBattersByTeamYear,
            getDrillDownResults: getDrillDownResults,
            getOpponentsForBatter: getOpponentsForBatter,
            getTeamsByYear: getTeamsByYear,
            runFvFSearch: runFvFSearch,
            runPvPSearch: runPvPSearch
        };

        return service;

        //This is called from the routeconfigurator (in addition to app start)
        //, in case pages are bookmarked.
        function appPrime() {
            //make sure we only run once.
            if (primePromise) { return primePromise; }

            primePromise = $q.all([bindFranchiseList(), bindYearList()])
            	.then(function(){
                	defineFacade();
            	})
            	.catch(function (status) {
            	    log('appPrime failed', status, false);
                    primePromise = undefined;
                });

            return primePromise;

            function defineFacade() {
                // extend service with a context object of data
                service.context = {
                    franchises: getLocalData(config.remoteServiceNames.franchises),
                    years: getLocalData(config.remoteServiceNames.years)
                }
            }
            // allow for more local resource lookups
            function getLocalData(resource) {
                if (resource === config.remoteServiceNames.franchises) {
                    return statemanager.getFranchiseList();
                } else if (resource === config.remoteServiceNames.years) {
                    return statemanager.getYearList();
                }
            }
        }

        function bindFranchiseList() {
            return $q.when(statemanager.primeFranchiseList());
        }

        function bindYearList() {
            return $q.when(statemanager.primeYearList());
        }

        function getBattersByTeamYear(team, year) {
            return $q.when(httpApi.getBatters(team.team_abbr, year.season));
        }

        function getDrillDownResults(subType, params) {
            if (subType === config.appStrings.subRouteFvf) {
                return $q.when(httpApi.runFvFByYearSearch(params));
            } else {
                return $q.when(httpApi.runPvPByYearSearch(params));
            }
        }

        function getOpponentsForBatter(champion) {
            return $q.when(httpApi.getOpponentsForBatter(selectedYear, champion.player_retro_id));
        }

        function getTeamsByYear(yearObj) {
            selectedYear = yearObj.season;
            return $q.when(statemanager.getTeamsByYearList(selectedYear));
        }

        function runFvFSearch (championId, opponentId) {
            return $q.when(httpApi.runFvFSearch(championId, opponentId));
        }

		function runPvPSearch (championId, opponentId) {
            return $q.when(httpApi.runPvPSearch(championId, opponentId));
        }
    }
})();
