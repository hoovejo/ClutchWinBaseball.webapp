(function () {
    'use strict';

    // Controller name is handy for logging
    var controllerId = 'search';

    // Define the controller on the module.
    // Inject the dependencies. 
    // Point to the controller definition function.
    angular.module('app').controller(controllerId,
        ['common', 'config', 'datacontext', 'stateservice', search]);

    function search(common, config, datacontext, stateservice) {
        // Using 'Controller As' syntax, so we assign this to the vm variable (for viewmodel).
        var vm = this;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        // Bindable properties and functions are placed on vm.
        vm.activate = activate;
        vm.title = config.appStrings.searchTitle;
        vm.battersByTeam = battersByTeam;
        vm.teamsByYear = teamsByYear;
        // Bindable properties for search.html
        vm.searchprops = {
            year: 0,
            years: [],
            team: {},
            teams: []
        }

        activate();

        function activate() {
            var promises = [initController()];
            common.activateController(promises, controllerId)
                 .then(function () {
                     //log('Activated Search View');
                 });
        }

        function battersByTeam() {
            datacontext.getBattersByTeamYear(vm.searchprops.team, vm.searchprops.year).then(function (data) {
                stateservice.champions = data;
                common.$broadcast(config.events.vsYearSearchExecuted, []);
            }).catch(function (status) {
                vm.error = status;
                log(status);
            });
        }

        function initController() {
            var ys = datacontext.context.years;
            vm.searchprops.year = ys[0] || 0;
            vm.searchprops.years = ys;

            var currDate = new Date();
            var year;
            if (currDate.getMonth() < 3) {
                year = currDate.getFullYear() - 1;
            } else {
                year = currDate.getFullYear();
            }

            searchForTeams(vm.searchprops.year || year);
        }

        function searchForTeams(year) {
            datacontext.getTeamsByYear(year).then(function (data) {
                vm.searchprops.teams = data;
            }).catch(function (status) {
                vm.error = status;
                log(status);
            });
        }

        function teamsByYear() {
            searchForTeams(vm.searchprops.year);
        }
    }
})();
