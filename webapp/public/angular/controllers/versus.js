(function () {
    'use strict';

    var controllerId = 'versus';

    angular.module('app').controller(controllerId,
        ['$scope', 'common', 'config', 'functionmodel', 'spinner', versus]);

    function versus($scope, common, config, functionmodel, spinner) {

        var vm = this;
        var keyCodes = config.keyCodes;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        vm.title = config.appStrings.appTitle;

        vm.isBusy = false;
        vm.busyMessage = config.appStrings.pleaseWait;
        vm.error = '';

        // slider and spinner props
        vm.spinnerOptions = spinner.defaultOptions;
        vm.slider = {
            interval: 3000
        };

        //vm functions
        vm.canShowSubmit = canShowSubmit;
        vm.loadSearchResults = loadSearchResults;
        vm.selectChamp = selectChamp;
        vm.selectOppon = selectOppon;
        // Bindable properties for versus.html
        vm.contr = {
            hasSelectedChampion: false,
            hasSelectedOpponent: false,
            opponentfilter: function (champion) {
                return function (item) {
                    return (!(champion && champion.franchise_abbr) || item.franchise_abbr != champion.franchise_abbr);
                }
            }
        };
        // Bindable properties for resultcontainer.html
        vm.rslts = {
            array: [],
            page: 0,
            pagesize: config.pageSize,
            numberof: function (rows) {
                if (rows) { return Math.ceil(rows.length / vm.rslts.pagesize); }
                return 1;
            }
        };
        //def
        var champIdFn = function () { };
        var oppoIdFn = function () { };
        var notifyFn = function () { };
        var searchFn = function () { };
        var selectChampFn = function () { };

        activate();

        function activate() {
            var promises = [initController()];
            common.activateController(promises, controllerId).then(function () {
                notifyFn();
            });
        }

        function canShowSubmit() {
            return vm.contr.hasSelectedChampion && vm.contr.hasSelectedOpponent;
        }

        function initController() {
            functionmodel.getViewFunctions().then(function (data) {
                notifyFn = data.notify;
                searchFn = data.search;
                champIdFn = data.champId;
                oppoIdFn = data.oppoId;
                selectChampFn = data.selectC;
                vm.subtitle = data.subtitle;
                vm.enableSearch = data.enableSearch;
                vm.contr.cheading = data.cheading;
                vm.contr.oheading = data.oheading;
            }).catch(function (status) {
                vm.error = status;
                log(status);
            });
        }

        function loadSearchResults() {
            resetResults();
            toggleSpinner(true);

            var champId = selectChampId();
            var opponId = selectOppoId(); //vm.contr.opponent.franchise_abbr;
            
            return searchFn(champId, opponId).then(function (data) {
                toggleSpinner(false);
                
                vm.rslts.array.fieldnames = [];
                var setup = false;

                for (var key in data) {
                    if (setup) break;
                    setup = true;
                    var obj = data[key];
                    for (var prop in obj) {
                        console.log(prop);
                        if (obj.hasOwnProperty(prop) && (prop.indexOf('drilldown') == -1) ) {
                            vm.rslts.array.fieldnames.push({ name: prop });
                        }
                    }
                }
                
                return vm.rslts.array.rows = data;

            }).catch(function (status) {
                toggleSpinner(false);
                vm.error = status;
                log(status);
            });
        }

        function resetResults() {
            $scope.$broadcast(config.events.vsSearching, []);
            vm.rslts.page = 0;
            vm.rslts.array = [];
        }

        function selectChampId() {
            return champIdFn(vm.contr)
        }
        
        function selectOppoId() {
            return oppoIdFn(vm.contr)
        }

        function selectChamp() {
            resetResults();
            return selectChampFn(vm.contr, toggleSpinner);
        }

        function selectOppon() {
            resetResults();
            vm.contr.hasSelectedOpponent = true;
        }

        function toggleSpinner(on) {
            vm.isBusy = on;
        }
    }
})();

