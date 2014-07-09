(function () {
    'use strict';

    var controllerId = 'opponent';
    angular.module('app').controller(controllerId,
        ['common', 'config', 'functionmodel', opponent]);

    function opponent(common, config, functionmodel) {

        var vm = this;
        var keyCodes = config.keyCodes;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        //base list
        vm.opponents = [];

        //opponent filtering
        var applyFilter = function () { };
        vm.filteredOpponents = [];
        vm.opponentsSearch = '';

        //vm functions
        vm.clear = clear;
        vm.getOpponents = getOpponents;
        vm.opponentsFilter = opponentsFilter;
        vm.runFilter = runFilter;

        activate();

        function activate() {
            var promises = [initController()];
            common.activateController(promises, controllerId)
                 .then(function () {
                     // createSearchThrottle uses values by convention, via its parameters:
                     // vm.opponentsSearch is where the user enters the search
                     // vm.opponents is the original unfiltered array
                     // vm.filteredopponents is the filtered array
                     // vm.opponentsFilter is the filtering function
                     applyFilter = common.createSearchThrottle(vm, config.appStrings.opponents);
                     if (vm.opponentsSearch) { applyFilter(true); }
                     //log('Activated Opponent View');
                 });
        }

        var baseOpponents = function () { };

        function clear() {
            vm.opponentsSearch = '';
            applyFilter(true);
        }

        function getOpponents() {
            vm.opponents = vm.filteredOpponents = baseOpponents();
            if (vm.opponentsSearch) {
                applyFilter(true);
            }
            return vm.filteredOpponents;
        }

        function initController() {
            functionmodel.getViewFunctions().then(function (data) {
                baseOpponents = data.opponents;
            }).catch(function (status) {
                vm.error = status;
                log(status);
            });
        }

        function opponentsFilter(opponent) {
            //textContains:parameters a) text to search b) what we are searching for
            var textContains = common.textContains;
            var searchText = vm.opponentsSearch;
            var name = opponent.displayname();
            var isMatch = searchText ?
                textContains(name, searchText)
                : true;
            return isMatch;
        }

        function runFilter($event) {
            if ($event.keyCode === keyCodes.esc) {
                vm.opponentsSearch = '';
                applyFilter(true);
            } else {
                applyFilter();
            }
        }
    }
})();

