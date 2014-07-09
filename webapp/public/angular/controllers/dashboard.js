(function () {
    'use strict';

    var controllerId = 'dashboard';
    angular.module('app').controller(controllerId,
        ['$filter', 'common', 'config', 'features', dashboard]);

    function dashboard($filter, common, config, features) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;

        // definitions for the feature widgets
        vm.features = features;

        vm.today = '';
        vm.title = config.appStrings.Dashboard;

        activate();

        function activate() {
            var promises = [setDate()];
            common.activateController(promises, controllerId)
                .then(function () {
                    log(config.appStrings.DashboardReady);
                });
        }

        function setDate() {
            vm.today = $filter('date')(new Date(), ['longDate']);
        };
    }
})();
