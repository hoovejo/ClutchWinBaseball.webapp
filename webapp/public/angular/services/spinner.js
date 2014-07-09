(function () {
    'use strict';

    // Must configure the common service and set its 
    // events via the commonConfigProvider

    angular.module('common')
        .factory('spinner', ['common', 'commonConfig', spinner]);

    function spinner(common, commonConfig) {

        var defaultOptions = {
            radius: 40,
            lines: 7,
            length: 0,
            width: 30,
            speed: 1.7,
            corners: 1.0,
            trail: 100,
            color: '#F58A00'
        };

        var service = {
            defaultOptions: defaultOptions,
            spinnerHide: spinnerHide,
            spinnerShow: spinnerShow
        };

        return service;

        function spinnerHide() { spinnerToggle(false); }

        function spinnerShow() { spinnerToggle(true); }

        function spinnerToggle(show) {
            common.$broadcast(commonConfig.config.spinnerToggleEvent, { show: show });
        }
    }
})();