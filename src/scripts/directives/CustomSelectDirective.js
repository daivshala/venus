'use strict';

angular.module('venus')
.directive('customSelect', function () {
    return {
        restrict: 'E',
        scope   : {
            ngModel     : '=',
            options     : '=',
            optionsLabel: '@',
            optionsValue: '@?',
            placeholder : '@?'
        },
        link       : function (scope) {
            scope.open       = false;
            scope.toggleText = scope.placeholder ? scope.placeholder : null;

            scope.selectOption = function (option) {
                scope.open       = false;
                scope.toggleText = option[scope.optionsLabel];

                if (option[scope.optionsValue]) {
                    scope.ngModel = option[scope.optionsValue];
                    return;
                }

                scope.ngModel = option.id;
            };
        },
        templateUrl: 'directives/CustomSelectDirectiveTemplate.html'
    };
});
