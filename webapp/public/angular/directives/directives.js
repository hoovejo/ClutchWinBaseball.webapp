(function() {
    'use strict';

    var app = angular.module('app');

    //starting all the directive names by the app alias as a convention (aka. vs)
    // use (data-) prefix's for valid html

    app.directive('vsDisabled', function ($compile) {
        // Disabled an anchor after click.
        // Usage:
        //  <a data-vs-disabled>
        var directive = {
            link: link,
            priority: -99999,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.$watch(attrs.vsDisabled, function (val, oldval) {
                if (!!val) {
                    element.unbind('click');
                } else if (oldval) {
                    element.bind('click', function () {
                        scope.$apply(attrs.ngClick);
                    });
                }
            });
        };
    });

    app.directive('vsScrollOnClick', function () {
        // Scrolls the window to top on click.
        // Usage:
        //  <button data-vs-scroll-on-click>
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            element.on('click', function () {
                $('body').animate({ scrollTop: 0 }, 500);
            });
        }
    });

    app.directive('vsWidgetBusy', function () {
        // Adds section for busy widget
        // Usage:
        //  <div data-vs-widget-busy>
        var directive = {
            restrict: 'A',
            templateUrl: 'widgetbusy.html',
        };
        return directive;
    });

    app.directive('vsWidgetSplash', function () {
        // Adds section for fancy widget
        // Usage:
        //  <div data-vs-widget-splash>
        var directive = {
            restrict: 'A',
            templateUrl: 'widgetsplash.html',
        };
        return directive;
    });

    app.directive('vsSearch', function () {
        // Adds section for search feature.
        // Usage:
        //  <div data-vs-search>
        var directive = {
            restrict: 'A',
            templateUrl: 'search.html'
        };
        return directive;
    });

    app.directive('vsChampion', function () {
        // Adds section for champions in a versus scenario.
        // Usage:
        //  <div data-vs-champion>
        var directive = {
            restrict: 'A',
            templateUrl: 'champion.html'
        };
        return directive;
    });

    app.directive('vsOpponent', function () {
        // Adds section for opponents in a versus scenario.
        // Usage:
        //  <div data-vs-opponent>
        var directive = {
            restrict: 'A',
            templateUrl: 'opponent.html'
        };
        return directive;
    });

    app.directive('vsResultContainer', function () {
        // Adds section to control result display and drilldown from a versus search.
        // Usage:
        //  <vs-result-container />
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'resultcontainer.html',
            scope: {//this sets isolated scope
                results: '=', //set the two way binding for the contract
            },
            controller: 'results as vm'
        };
        return directive;
    });

    app.directive('vsResultDisplay', function () {
        // Adds section to display results from a versus search.
        // Usage:
        //  <vs-result-display />
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'resultdisplay.html',
            controller: 'results as vm'
        };
        return directive;
    });

    app.directive('vsResultsDrilldown', function () {
        // Adds section to display drilldown results from a result display row.
        // Usage:
        //  <vs-result-drilldown />
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'resultsdrilldown.html',
            controller: 'results as vm'
        };
        return directive;
    });

    app.directive('vsImgPerson', ['config', function (config) {
        //Usage:
        //<img data-vs-img-person title="{{s.person.imageSource}}"/>
        var basePath = config.imageSettings.imageBasePath;
        var unknownImage = config.imageSettings.unknownPersonImageSource
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            attrs.$observe('vsImgPerson', function (value) {
                value = basePath + (value || unknownImage);
                attrs.$set('src', value);
            });
        }
    }]);

    app.directive('vsSidebar', ['$window', 'common', function ($window, common) {
        // Repositions the sidebar on window resize 
        // and opens and closes the sidebar menu.
        // Usage:
        //  <div data-vs-sidebar>
        // Creates:
        //  <div data-vs-sidebar class="sidebar">
        var directive = {
            link: link,
            restrict: 'A'
        };
        var $win = $($window);
        return directive;

        function link(scope, element, attrs) {
            var $sidebarInner = element.find('.sidebar-inner');
            var $dropdownElement = element.find('.sidebar-dropdown a');
            
            
            element.addClass('sidebar');
            $win.resize(resize);
            $dropdownElement.click(dropdown);

            function doTheResize() {
                $win.width() >= 765 ? $sidebarInner.slideDown(350) : $sidebarInner.slideUp(350);
            }

            //common.debouncedThrottle is used to only fire the resize event 
            //after the user has finished resizing; rather than firing lots of times 
            //unnecessarily while resizing.
            function resize() {
                common.debouncedThrottle('winSidebarResize', doTheResize, 800, false);
            }

            function dropdown(e) {
                var dropClass = 'dropy';
                e.preventDefault();
                if (!$dropdownElement.hasClass(dropClass)) {
                    hideAllSidebars();
                    $sidebarInner.slideDown(350);
                    $dropdownElement.addClass(dropClass);
                } else if ($dropdownElement.hasClass(dropClass)) {
                    $dropdownElement.removeClass(dropClass);
                    $sidebarInner.slideUp(350);
                }

                function hideAllSidebars() {
                    $sidebarInner.slideUp(350);
                    $('.sidebar-dropdown a').removeClass(dropClass);
                }
            }
            
        }
    }]);

    app.directive('vsWidgetClose', function () {
        // Usage:
        // <a data-vs-widget-close></a>
        // Creates:
        // <a data-vs-widget-close="" href="#" class="wclose">
        //     <i class="icon-remove"></i>
        // </a>
        var directive = {
            link: link,
            template: '<i class="icon-remove"></i>',
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            attrs.$set('href', '#');
            attrs.$set('wclose');
            element.click(close);

            function close(e) {
                e.preventDefault();
                element.parent().parent().parent().hide(100);
            }
        }
    });

    app.directive('vsWidgetMinimize', function () {
        // Usage:
        // <a data-vs-widget-minimize></a>
        // Creates:
        // <a data-vs-widget-minimize="" href="#"><i class="fa fa--chevron-up"></i></a>
        var directive = {
            link: link,
            template: '<i class="fa fa-chevron-up"></i>',
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            //$('body').on('click', '.widget .wminimize', minimize);
            attrs.$set('href', '#');
            attrs.$set('wminimize');
            element.click(minimize);

            function minimize(e) {
                e.preventDefault();
                var $wcontent = element.parent().parent().next('.widget-content');
                var iElement = element.children('i');
                if ($wcontent.is(':visible')) {
                    iElement.removeClass('fa fa-chevron-up');
                    iElement.addClass('fa fa-chevron-down');
                } else {
                    iElement.removeClass('fa fa-chevron-down');
                    iElement.addClass('fa fa-chevron-up');
                }
                $wcontent.toggle(500);
            }
        }
    });

    app.directive('vsScrollToTop', ['$window', function ($window) {
        // Usage:
        // <span data-vs-scroll-to-top></span>
        // Creates:
        // <span data-vs-scroll-to-top="" class="totop">
        //      <a href="#"><i class="fa fa--chevron-up"></i></a>
        // </span>
        var directive = {
            link: link,
            template: '<a href="#"><i class="fa fa-chevron-up"></i></a>',
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            
            
            var $win = $($window);
            element.addClass('totop');
            $win.scroll(toggleIcon);

            element.find('a').click(function (e) {
                e.preventDefault();
                // Learning Point: $anchorScroll works, but no animation
                //$anchorScroll();
                $('body, html').animate({ scrollTop: 0 }, 500);
            });

            function toggleIcon() {
                $win.scrollTop() > 300 ? element.slideDown(): element.slideUp();
            }
        }
    }]);

    app.directive('vsSpinner', ['$window', function ($window) {
        // Description:
        //  Creates a new Spinner and sets its options
        // Usage:
        //  <div data-vs-spinner="vm.spinnerOptions"></div>
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.spinner = null;
            scope.$watch(attrs.ccSpinner, function (options) {
                if (scope.spinner) {
                    scope.spinner.stop();
                }
                scope.spinner = new $window.Spinner(options);
                scope.spinner.spin(element[0]);
            }, true);
        }
    }]);

    app.directive('vsWidgetHeader', function() {
        //Usage:
        //<div data-vs-widget-header title="vm.map.title"></div>
        var directive = {
            link: link,
            scope: {
                'title': '@',
                'subtitle': '@',
                'rightText': '@',
                'allowCollapse': '@'
            },
            templateUrl: 'widgetheader.html',
            restrict: 'A',
        };
        return directive;

        function link(scope, element, attrs) {
            attrs.$set('class', 'widget-head');
        }
    });

    app.directive('vsWidgetFeature', function () {
        //Usage:
        //<div data-vs-widget-feature title="{{vm.features.fvf.title}}" href="{{vm.features.fvf.href}}"
        //      description="{{vm.features.fvf.description}}"></div>
        var directive = {
            link: link,
            scope: {
                'title': '@',
                'href': '@',
                'css': '@',
                'description': '@'
            },
            templateUrl: 'widgetfeature.html',
            restrict: 'A',
        };
        return directive;

        function link(scope, element, attrs) {
            attrs.$set('class', 'widget-content');
        }
    });

})();