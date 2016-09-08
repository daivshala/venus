'use strict';

angular.module('venus')
.directive('selector', function () {
    return {
        restrict: 'E',
        scope   : {
            title       : '@',
            value       : '@?',
            prefix      : '@?',
            array       : '=?',
            ngModel     : '=?',
            ngTrueValue : '=?',
            ngFalseValue: '=?',
        },
        link: function (scope, element) {
            element.addClass('venus selector');

            scope.randomId = Math.random();

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
                    }
                };

                scope.itemChecked();
            }
        },
        templateUrl: 'directives/SelectorDirectiveTemplate.html'
    };
});
