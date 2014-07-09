(function () {
    'use strict';

    var app = angular.module('app');

    // Collect the routes
    app.constant('routes', getRoutes());
    
    // Configure the routes and route resolvers
    app.config(['$routeProvider', 'routes', routeConfigurator]);
    function routeConfigurator($routeProvider, routes) {

        routes.forEach(function (r) {
            setRoute(r.url, r.config);
        });
        // Default to home
        $routeProvider.otherwise({ redirectTo: '/' });

        //call appPrime for every route, by extending any existing resolvers
        // or creating a new one.
        function setRoute(url, definition) {
            definition.resolve = angular.extend(definition.resolve || {}, {
                prime: prime
            });
            $routeProvider.when(url, definition);
        }
    }

    prime.$inject = ['datacontext'];
    function prime(datacontext) { return datacontext.appPrime(); }

    // Define the routes 
    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'dashboard.html',
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            }, {
                url: '/versus/fvf',
                config: {
                    title: 'Team vs Team',
                    templateUrl: 'versus.html',
                    settings: {
                        nav: 2,
                        versus: 'fvf',
                        content: '<i class="fa fa-gears"></i> Team vs Team'
                    }
                }
            }, {
                url: '/versus/pvp',
                config: {
                    title: 'Batter vs Pitcher',
                    templateUrl: 'versus.html',
                    settings: {
                        nav: 3,
                        versus: 'pvp',
                        content: '<i class="fa fa-tasks"></i> Batter vs Pitcher'
                    }
                }
            }, {
                url: '/about',
                config: {
                    title: 'About',
                    templateUrl: 'about.html',
                    settings: {
                        versus: 'about',
                        content: '<i class="fa fa-gears"></i> About'
                    }
                }
            }
        ];
    }
})();