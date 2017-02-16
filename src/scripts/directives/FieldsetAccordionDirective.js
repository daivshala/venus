'use strict';

angular.module('aphrodite')
.directive('fieldsetAccordion', function () {
    return {
        restrict: 'E',
        scope   : {
            opened      : '=?',
            legend      : '@?',
            legendOpened: '@?',
            legendClosed: '@?',
        },
        transclude : true,
        templateUrl: 'directives/FieldsetAccordionDirectiveTemplate.html'
    };
});
