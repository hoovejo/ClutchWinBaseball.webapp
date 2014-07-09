(function () {
    'use strict';

    var controllerId = 'about';

    angular.module('app').controller(controllerId,
        ['common', 'config', 'spinner', about]);

    function about(common, config, spinner) {
        var vm = this;

        vm.isBusy = false;
        vm.busyMessage = config.appStrings.pleaseWait;

        // slider and spinner props
        vm.spinnerOptions = spinner.defaultOptions;
        vm.slider = {
            interval: 3000
        };

        activate();

        function activate() {
            var promises = [];
            common.activateController(promises, controllerId).then(function () {
                toggleSpinner(false);
            });
        }

        function toggleSpinner(on) {
            vm.isBusy = on;
        }
    }
})();
