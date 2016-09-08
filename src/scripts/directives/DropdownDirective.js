'use strict';

angular.module('venus')
.directive('dropdown', function ($document) {
    return {
        restrict: 'A',
        link    : function (scope, element, attr) {
            element.on('click', function () {
                element.toggleClass('active');
            });

            $document.on('click', function (el) {
                if (el.target.parentElement.id !== attr.id) {
                    element.removeClass('active');
                }
            });
        }
    };
});

