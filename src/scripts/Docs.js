'use strict';

angular.module('venus-docs', [
    'ngRoute',
    'duScroll',
    'venus'
])
.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'docs/main-template.html',
            controller : 'MainController',
        })
        .when('/updates', {
            templateUrl: 'docs/updates-template.html',
            controller : 'UpdatesController'
        })
        .when('/components', {
            templateUrl: 'docs/components-template.html',
        })
        .when('/components/:componentId', {
            templateUrl: function (urlattr) {
                return 'docs/components/' + urlattr.componentId + '-template.html';
            },
            controller : 'ComponentsGenericController'
        })
        .otherwise({
            redirectTo: '/'
        });
});
