(function () {
    'use strict';

    var controllerId = 'champion';
    angular.module('app').controller(controllerId,
        ['common', 'config', 'functionmodel', champion]);

    function champion(common, config, functionmodel) {

        var vm = this;
        var keyCodes = config.keyCodes;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        var events = config.events;

        //base list
        vm.champions = [];

        //champion filtering
        var applyFilter = function () { };
        vm.filteredChampions = [];
        vm.championsSearch = '';

        //vm functions
        vm.championsFilter = championsFilter;
        vm.clear = clear;
        vm.getChampions = getChampions;
        vm.runFilter = runFilter;

        //vm properties
        vm.showChampList = true;

        activate();

        function activate() {
            var promises = [initController()];
            common.activateController(promises, controllerId)
                 .then(function () {
                     // createSearchThrottle uses values by convention, via its parameters:
                     // vm.championsSearch is where the user enters the search
                     // vm.champions is the original unfiltered array
                     // vm.filteredchampions is the filtered array
                     // vm.championsFilter is the filtering function
                     applyFilter = common.createSearchThrottle(vm, config.appStrings.champions);
                     if (vm.championsSearch) { applyFilter(true); }
                     //log('Activated Champion View');
                 });
        }

        var baseChampions = function () { };

        function championsFilter(champion) {
            //textContains:parameters a) text to search b) what we are searching for
            var textContains = common.textContains;
            var searchText = vm.championsSearch;
            var name = champion.displayname();
            var isMatch = searchText ?
                textContains(name, searchText)
                : true;
            return isMatch;
        }

        function clear() {
            vm.championsSearch = '';
            applyFilter(true);
        }

        function getChampions() {
            vm.champions = vm.filteredChampions = baseChampions();
            if (vm.championsSearch) {
                applyFilter(true);
            }
            return vm.filteredChampions;
        }

        function initController() {
            functionmodel.getViewFunctions().then(function (data) {
                baseChampions = data.champions;
                vm.showChampList = !data.enableSearch;
            }).catch(function (status) {
                vm.error = status;
                log(status);
            });
        }

        function runFilter($event) {
            if ($event.keyCode === keyCodes.esc) {
                vm.championsSearch = '';
                applyFilter(true);
            } else {
                applyFilter();
            }
        }

        common.$rootScope.$on(events.vsYearSearchExecuted, function () {
            vm.showChampList = true;
        });
    }
})();

