(function () {
    'use strict';

    // Factory name is handy for logging
    var serviceId = 'routemediator';

    // Define the factory on the module.
    // Inject the dependencies. 
    // Point to the factory definition function.
    angular.module('app').factory(serviceId,
        ['$rootScope', '$route', '$location', 'logger', 'config', routemediator]);

    function routemediator($rootScope, $route, $location, logger, config) {

        // Define the functions and properties to reveal.
        var handleRouteChangeError = false;

        var service = {
            currentSubRoute: currentSubRoute,
            setRoutingHandlers: setRoutingHandlers
        };

        return service;

        function currentSubRoute() {
            return $route.current.settings.versus;
        }

        function setRoutingHandlers() {
            updateDocTitle();
            handleRoutingErrors();
        }

        function handleRoutingErrors() {
            $rootScope.$on(config.events.routeChangeError,
                function (event, current, previous, rejection) {
                    if (handleRouteChangeError) { return; }
                    handleRouteChangeError = true;
                    var msg = config.appStrings.routingError + (current && current.name);
                    logger.logWarning(msg, current, serviceId, true);
                    $location.path('/');
                });
        };

        function updateDocTitle() {
            $rootScope.$on(config.events.routeChangeSuccess,
                function (event, current, previous) {
                    handleRouteChangeError = false;
                    var title = config.docTitle + ' ' + (current.title || '');
                    $rootScope.title = title;
                });
        }
    }

})();