'use strict';

angular
  .module('venus-showcase', [
    'ngRoute',
    'angucomplete-alt',
    'venusUI',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
