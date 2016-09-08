'use strict';

angular.module('venus-docs')
.controller('MainController', function ($scope, countries) {

    $scope.countries = countries;

    $scope.steps = [
        {
            text: 'Step 1',
            url: '/'
        },
        {
            text: 'Step 2',
            url: '/2'
        },
        {
            text: 'Step 3',
            url: '/3'
        },
    ];

  });
