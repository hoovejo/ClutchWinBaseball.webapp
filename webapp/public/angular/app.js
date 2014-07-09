(function () {
    'use strict';

    // By convention, dollar sign prefix indicates an angular service
    // - others are app specific
    var app = angular.module('app', [
        // Define dependencies for this app
        // Angular modules 
        'ngAnimate',        // animations
        'ngRoute',          // routing
        'ngSanitize',       // sanitizes html bindings (ex: sidebar.js)
        'ngResource',       // high-level behaviors without the need to interact with the low level $http service

        // Custom modules 
        'common',           // common functions, logger, spinner
        'common.bootstrap', // bootstrap dialog wrapper functions

        // 3rd Party Modules
        'ui.bootstrap'      // ui-bootstrap (ex: carousel, pagination, dialog)
    ]);

    // Handle routing errors and success events
    app.run(['$route', 'routemediator', 'datacontext',
        // Include $route to kick start the router.
        function ($route, routemediator, datacontext) {
            // Handle invalid routes
            // Handle tab titles/browser history etc
            routemediator.setRoutingHandlers();
            // acquire any partial data needed to boot the app
            datacontext.appPrime();
    }]);

})();