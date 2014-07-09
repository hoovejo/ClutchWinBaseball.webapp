(function () {
    'use strict';

    var app = angular.module('app');

    // Configure Toastr
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';

    //hard code for now, mobile needs less than desktop
    var pageSize = 30;

    var keyCodes = {
        backspace: 8,
        tab: 9,
        enter: 13,
        esc: 27,
        space: 32,
        pageup: 33,
        pagedown: 34,
        end: 35,
        home: 36,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        insert: 45,
        del: 46
    }

    // Remote service names
    var remoteServiceNames = {
        jsonSuffix: '.json',
        franchises: '/api/v1/franchises',
        franchiseSearch: '/api/v1/gamesForTeamSummary/',
        franchiseYearSearch: '/api/v1/gamesForTeam/',
        opponentsForBatter: '/api/v1/pitchers/',
        playerPlayerSearch: '/api/v1/playerEventsSummary/',
        playerPlayerYearSearch: '/api/v1/playerEvents/',
        rosterSearch: '/api/v1/players/',
        teams: '/api/v1/teams/',
        years: '/api/v1/seasons'
    };

    var imageSettings = {
        imageBasePath: 'http://placekitten.com',
        //imageBasePath: '/assets/', //rails server base url
        unknownPersonImageSource: 'icon.png'//unknown_person.jpg
    };

    var events = {
        controllerActivateSuccess: 'controller.activateSuccess',
        routeChangeStart: '$routeChangeStart',
        routeChangeError: '$routeChangeError',
        routeChangeSuccess: '$routeChangeSuccess',
        spinnerToggle: 'spinner.toggle',
        vsSearching: 'vsSearching',
        vsYearSearchExecuted: 'vsYearSearchExecuted'
    };

    var appStrings = {
        appLoaded: 'ClutchWin baseball loaded!',
        appTitle: 'ClutchWin baseball',
        champions: 'champions',
        current: 'current',
        DashboardReady: 'Dashboard Ready',
        Dashboard: 'Dashboard',
        franchises: 'franchises',
        fvfChampHeading: 'Team:',
        fvfOppoHeading: 'Opponent:',
        fvfReady: 'Team vs Team ready',
        fvfSubTitle: 'team vs team',
        opponents: 'opponents',
        pleaseWait: 'Please wait ...',
        pvpChampHeading: 'Batter:',
        pvpOppoHeading: 'Pitcher:',
        pvpReady: 'Batter vs Pitcher ready',
        pvpSubTitle: 'batter vs pitcher',
        routingError: 'Error routing: ',
        subRoutePvp: 'pvp',
        subRouteFvf: 'fvf',
        searchTitle: 'search',
        success: 'success',
        teamlist: 'teamlist',
        years: 'years'
    };

    //expose the objects via config
    var config = {
        appErrorPrefix: '[ClutchWin baseball Error] ', //Configure the exceptionHandler decorator
        appStrings: appStrings,
        docTitle: 'ClutchWin baseball: ',
        events: events,
        imageSettings: imageSettings,
        keyCodes: keyCodes,
        pageSize: pageSize,
        remoteServiceNames: remoteServiceNames,
        version: '2.0.0'
    };

    app.value('config', config);

    app.config(['$logProvider', function ($logProvider) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
    }]);

    //#region Configure the common services via commonConfig
    app.config(['commonConfigProvider', function (cfg) {
        cfg.config.controllerActivateSuccessEvent = config.events.controllerActivateSuccess;
        cfg.config.spinnerToggleEvent = config.events.spinnerToggle;
    }]);
    //#endregion
})();