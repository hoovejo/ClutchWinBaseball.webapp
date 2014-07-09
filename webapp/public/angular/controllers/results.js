(function () {
    'use strict';

    // Controller name is handy for logging
    var controllerId = 'results';

    // Define the controller on the module.
    // Inject the dependencies. 
    // Point to the controller definition function.
    angular.module('app').controller(controllerId,
        ['$scope', 'common', 'config', 'datacontext', 'routemediator', 'spinner', results]);

    function results($scope, common, config, datacontext, routemediator, spinner) {

        var vm = this;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        vm.isBusy = false;
        vm.busyMessage = config.appStrings.pleaseWait;
        vm.error = '';
        // slider and spinner props
        vm.spinnerOptions = spinner.defaultOptions;
        //base list
        vm.drillDownResults = [];

        //vm functions
        vm.clear = clear;
        vm.goToDrillDown = goToDrillDown;

        function clear() {
            vm.drillDownResults = [];
        };

        function goToDrillDown(row) {
            toggleSpinner(true);
            datacontext.getDrillDownResults(routemediator.currentSubRoute(), row.drilldown()).then(function (data) {
                
                toggleSpinner(false);
                
                vm.drillDownResults.fieldnames = [];
                var setup = false;
                
                for (var key in data) {
                    if (setup) break;
                    setup = true;
                    var obj = data[key];
                    for (var prop in obj) {
                        if (obj.hasOwnProperty(prop)) {
                            vm.drillDownResults.fieldnames.push({ name: prop });
                        }
                    }
                }

                vm.drillDownResults.rows = data;

            }).catch(function (status) {
                toggleSpinner(false);
                vm.error = status;
                log(status);
            });
        };

        $scope.$on(config.events.vsSearching, function (event, data) {
            vm.drillDownResults = [];
        });

        function toggleSpinner(on) {
            vm.isBusy = on;
        }
    }
})();
