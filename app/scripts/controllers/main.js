'use strict';

angular.module('venusApp')
  .controller('MainCtrl', function ($scope, VenusActivityIndicatorService, $timeout) {
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

    $scope.isButtonDisabled = true;

    $scope.activityTest = function(activityText){
        VenusActivityIndicatorService.startActivity(activityText);
        $timeout(function(){
            VenusActivityIndicatorService.stopActivity(activityText);
        }, 5000);
    }

    $scope.errorTest = function(errorText){
        VenusActivityIndicatorService.error(errorText);
    }
  });
