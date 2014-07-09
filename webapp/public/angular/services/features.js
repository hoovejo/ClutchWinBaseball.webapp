(function () {
    'use strict';

    var serviceId = 'features';

    angular.module('app').factory(serviceId, [features]);

    function features() {
        // Define the functions and properties to reveal.
        //can these be defined in the db.
        return {
            fvf: {
                css: 'wgreen',
                title: 'Team vs Team',
                href: '/versus/fvf',
                description: 'Find out how your favourite baseball teams perform against their rivals.'
            },
            pvp: {
                css: 'wgreen',
                title: 'Batter vs Pitcher',
                href: '/versus/pvp',
                description: 'Find out how your favourite baseball batter performs against other pitchers.'
            }
        }
    }
})();