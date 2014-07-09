(function () {
    'use strict';

    var app = angular.module('app');

    app.factory('resourceApi',
        ['$resource', 'common', 'config', resourceApi]);

    function resourceApi($resource, common, config) {

        var $q = common.$q;
        var rc = config.remoteServiceNames;

        return {
            franchises: function () {
                var deferred = $q.defer();
                var r = $resource(rc.franchises);
                r.prototype.displayname = function () {
                    return this.location + ' ' + this.name;
                };
                r.query(function (successData) {
                    deferred.resolve(successData);
                }, function (errorData) {
                    deferred.reject(errorData);
                });
                return deferred.promise;
            }
        };
    }
})();