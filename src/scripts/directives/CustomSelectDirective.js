'use strict';

angular.module('venus')
.directive('customSelect', function ($window, $compile, $templateCache) {
    return {
        restrict: 'E',
        scope   : {
            ngModel     : '=',
            ngDisabled  : '=?',
            ngRequired  : '=?',
            options     : '=',
            optionsLabel: '@',
            optionsValue: '@?',
            placeholder : '@?',
            id          : '@?'
        },
        link       : function (scope, element) {
            var screenWidth;
            var template;
            var templates = {
                desktop: 'directives/CustomSelectDirectiveTemplate.html',
                mobile : 'directives/CustomSelectMobileDirectiveTemplate.html'
            };

            scope.open       = false;
            scope.toggleText = scope.placeholder ? angular.copy(scope.placeholder) : null;

            /*
             * Toggle list options visibility
             */
            scope.toggle = function () {
                if (scope.ngDisabled) {
                    return;
                }

                scope.open = scope.open ? false : true;
            };

            /*
             * Options dropdown selection
             */
            scope.selectOption = function (option) {
                scope.open       = false;
                scope.toggleText = option[scope.optionsLabel];

                if (option[scope.optionsValue]) {
                    scope.ngModel = option[scope.optionsValue];
                    return;
                }

                scope.ngModel = option.id;
            };

            /*
             * Watch window width to compile right template
             */
            scope.chooseTemplate = function () {
                if (screenWidth !== $window.innerWidth) {
                    screenWidth = $window.innerWidth;

                    if (screenWidth >= 768 && template !== templates.desktop) {
                        template = templates.desktop;

                        scope.compile();
                    }

                    if (screenWidth <= 767 && template !== templates.mobile) {
                        template = templates.mobile;

                        scope.compile();
                    }
                }
            };

            /*
             * Compile directive
             */
            scope.compile = function () {
                element.html($templateCache.get(template));
                $compile(element.contents())(scope);
            };

            /*
             * Watch window resize to recompile
             */
            angular.element($window).bind('resize', function () {
                scope.chooseTemplate();
            });

            /*
             * First run
             */
            scope.chooseTemplate();
        },
    };
});
