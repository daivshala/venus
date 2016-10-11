'use strict';

angular.module('venus')
.directive('selector', function () {
    return {
        restrict: 'E',
        scope   : {
            title       : '@',
            value       : '@?',
            prefix      : '@?',
            name        : '@?',
            array       : '=?',
            ngModel     : '=?',
            ngTrueValue : '=?',
            ngFalseValue: '=?',
            ngRequired  : '=?',
        },
        templateUrl: 'directives/SelectorDirectiveTemplate.html',
        link: function (scope, element) {
            scope.randomId = Math.random();

            element.addClass('venus selector');

            if (scope.array) {
                var index;

                scope.checkArray = function () {
                    index = scope.array.indexOf(scope.value);

                    if (index > -1) {
                        scope.array.splice(index, 1);

                    } else {
                        scope.array.push(scope.value);
                    }
                };

                scope.itemChecked = function () {
                    index = scope.array.indexOf(scope.value);

                    if (index > -1) {
                        scope.isChecked = true;

                        return;
                    }

                    scope.isChecked = false;
                };

                scope.$watch('array', function () {
                    scope.itemChecked();
                }, true);
            }
        },
    };
});
