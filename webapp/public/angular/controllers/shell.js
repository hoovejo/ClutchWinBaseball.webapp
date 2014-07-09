(function () {
    'use strict';

    var controllerId = 'shell';
    angular.module('app').controller(controllerId,
        ['common', 'config', 'spinner', shell]);

    function shell(common, config, spinner) {
        var vm = this;
        var logSuccess = common.logger.getLogFn(controllerId, config.appStrings.success);
        var events = config.events;
        vm.busyMessage = config.appStrings.pleaseWait;
        vm.isBusy = true;
        vm.hideSplash = false;

        vm.spinnerOptions = spinner.defaultOptions;

        activate();

        function activate() {
            logSuccess(config.appStrings.appLoaded, null, true);
            common.activateController([], controllerId)
                .then(function() {
                    vm.hideSplash = true;
                });
        }

        function toggleSpinner(on) { vm.isBusy = on; }

        common.$rootScope.$on(events.routeChangeStart,
            function (event, next, current) { toggleSpinner(true); }
        );

        common.$rootScope.$on(events.controllerActivateSuccess,
            function (data) { toggleSpinner(false); }
        );

        common.$rootScope.$on(events.spinnerToggle,
            function (data) { toggleSpinner(data.show); }
        );
    };
})();