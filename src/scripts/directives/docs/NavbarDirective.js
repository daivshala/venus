'use strict';

angular.module('venus-docs')
.directive('navbar', function (flow, routes) {
    return {
        restrict   : 'E',
        templateUrl: 'docs/directives/NavbarDirectiveTemplate.html',
        scope      : {},
        controller : function ($scope) {
            $scope.menu = routes;

            $scope.goTo = function (page) {
                flow.goTo(page);
            };
        }
    };
});
