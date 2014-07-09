(function () {
    'use strict';

    var serviceId = 'functionmodel';

    angular.module('app').factory(serviceId,
        ['common', 'config', 'datacontext', 'routemediator', 'stateservice', functionmodel]);

    function functionmodel(common, config, datacontext, routemediator, stateservice) {
        // Define the functions and properties to reveal.
        var service = datacontext;
        var $q = common.$q;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(serviceId);

        return {
            getViewFunctions: function () {

                var data,
                    deferred = $q.defer(),
                    subType = routemediator.currentSubRoute();

                if (subType === config.appStrings.subRouteFvf) {
                    data = {
                        subtitle: config.appStrings.fvfSubTitle,
                        cheading: config.appStrings.fvfChampHeading,
                        oheading: config.appStrings.fvfOppoHeading,
                        enableSearch: false,
                        champions: function () { return service.context.franchises; },
                        opponents: function () { return service.context.franchises; },
                        champId: function (contr) {
                            return contr.champion.franchise_abbr;
                        },
                        oppoId: function (contr) {
                            return contr.opponent.franchise_abbr;
                        },
                        notify: function () {
                            log(config.appStrings.fvfReady);
                        },
                        selectC: function (contr, toggleSpinner) {
                            contr.hasSelectedChampion = true;
                        },
                        search: function (championId, opponentId) {
                            return datacontext.runFvFSearch(championId, opponentId);
                        }
                    };
                    deferred.resolve(data);
                } else {
                    data = {
                        subtitle: config.appStrings.pvpSubTitle,
                        cheading: config.appStrings.pvpChampHeading,
                        oheading: config.appStrings.pvpOppoHeading,
                        enableSearch: true,
                        champions: function () { return stateservice.champions; },
                        opponents: function () { return stateservice.opponents; },
                        champId: function (contr) {
                            return contr.champion.player_retro_id;
                        },
                        oppoId: function (contr) {
                            return contr.opponent.player_id;
                        },
                        notify: function () {
                            log(config.appStrings.pvpReady);
                        },
                        selectC: function (contr, toggleSpinner) {
                            contr.hasSelectedChampion = true;
                            toggleSpinner(true);
                            datacontext.getOpponentsForBatter(contr.champion).then(function (data) {
                                stateservice.opponents = data;
                                toggleSpinner(false);
                            }).catch(function (status) {
                                log(status);
                                toggleSpinner(false);
                            });
                        },
                        search: function (championId, opponentId) {
                            return datacontext.runPvPSearch(championId, opponentId);
                        }
                    };
                    deferred.resolve(data);
                }

                return deferred.promise;
            }
        };
    }
})();