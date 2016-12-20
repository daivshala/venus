'use strict';

angular.module('venus-docs')
.directive('docsFooter', function () {
    return {
        restrict   : 'E',
        templateUrl: 'docs/directives/FooterDirectiveTemplate.html'
    };
});
