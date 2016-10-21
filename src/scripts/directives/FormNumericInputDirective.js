'use strict';

angular.module('venus')
.directive('formNumericInput', function () {
    return {
        restrict: 'A',
        require : 'ngModel',
        link    : function (scope, element) {
            element.on('keypress', function (event) {
                if (
                    event.keyCode >= 48 && event.keyCode <= 57 ||
                    event.keyCode === 13 || event.keyCode === 8
                ) {
                    return false;

                } else {
                    event.preventDefault();
                }
            });
        }
    };
});
