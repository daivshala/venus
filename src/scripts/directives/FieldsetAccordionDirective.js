'use strict';

angular.module('venus')
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
