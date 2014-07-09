(function() {
    'use strict';

    var app = angular.module('app');

    app.filter('capitalize', function () {
        return function (input, uppercase) {
            return input.replace(/(?:^|\s)\S/g, function (a) {
                return a.toUpperCase();
            });
        };
    });

    app.filter('heading', function () {
        return function(input, uppercase) {
            return input.replace("_", " ");
        };
    });

    app.filter('startFrom', function () {
        return function (input, start) {
            if (input) {
                start = +start; //parse to int
                return input.slice(start);
            }
        }
    });

})();
