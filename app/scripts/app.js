'use strict';

angular
  .module('venusApp', [
    'ngRoute',
    'venusUI',
    'ngAnimate',
    'ui.mask'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
