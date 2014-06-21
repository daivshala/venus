angular.module('VenusUI', []);
/*
	VENUS BREADCRUMBS

	PARAMETROS
	steps: [
		{
			text: 'texto',
			url: '/catalog'
		},
		{
			text: 'texto',
			url: '/catalog'
		},
	]
*/
angular.module('VenusUI').directive('venusBreadcrumbs', function () {
  // Runs during compile
  return {
    scope: { steps: '=' },
    restrict: 'A',
    templateUrl: 'bower_components/venus/dist/directives/venus-breadcrumbs-template.html',
    controller: [
      '$scope',
      '$rootScope',
      '$location',
      function ($scope, $rootScope, $location) {
        $scope.$watchCollection('steps', function () {
          $scope.updateActiveStep();
        });
        $scope.$on('$locationChangeSuccess', function (event, newLoc, oldLoc) {
          $scope.updateActiveStep();
        });
        $scope.updateActiveStep = function () {
          if (!$scope.steps) {
            return;
          }
          for (var i = $scope.steps.length - 1; i >= 0; i--) {
            if ($location.path().indexOf($scope.steps[i].url) > -1) {
              $scope.steps[i].visited = true;
              $scope.currentStep = $scope.steps[i];
            }
          }
          ;
        };
        $scope.stepClicked = function (step) {
          if (step.visited) {
            $location.path(step.url);
          }
        };
      }
    ],
    link: function ($scope, iElm, iAttrs, controller) {
    }
  };
});
angular.module('VenusUI').directive('venusActivityIndicator', [
  'VenusActivityIndicatorService',
  function (VenusActivityIndicatorService) {
    // Runs during compile
    return {
      scope: {},
      controller: [
        '$scope',
        '$element',
        '$attrs',
        '$transclude',
        'VenusActivityIndicatorService',
        function ($scope, $element, $attrs, $transclude, VenusActivityIndicatorService) {
          $scope.activities = VenusActivityIndicatorService.activities;
          $scope.errors = VenusActivityIndicatorService.errors;
          $scope.clearError = function (error) {
            VenusActivityIndicatorService.clearError(error);
          };
        }
      ],
      restrict: 'A',
      templateUrl: 'bower_components/venus/dist/directives/venus-activity-indicator.html',
      link: function ($scope, iElm, iAttrs, controller) {
      }
    };
  }
]);
angular.module('VenusUI').directive('venusPopover', function () {
  return {
    scope: {
      width: '@',
      height: '@',
      side: '@'
    },
    controller: [
      '$scope',
      '$element',
      '$attrs',
      '$transclude',
      function ($scope, $element, $attrs, $transclude) {
        var pointerSize = 20;
        var popoverPaddingSize = 10;
        $scope.parentElm = $element.parent();
        $scope.popoverElm = $element;
        $scope.pointer = angular.element(document.createElement('div'));
        $scope.pointer.addClass('pointer ' + $scope.side);
        $scope.popoverElm.css('width', $scope.width);
        $scope.popoverElm.css('height', $scope.height);
        $scope.popoverElm.addClass('venus popover ng-hide ' + $scope.side);
        if ($scope.side == 'right' || $scope.side == 'left') {
          $scope.popoverElm.css($scope.side, -1 * (parseInt($scope.width) + pointerSize) + 'px');
          $scope.popoverElm.css('top', $scope.parentElm[0].clientHeight / 2 - parseInt($scope.height) / 2 + 'px');
          $scope.pointer.css('top', parseInt($scope.height) / 2 - pointerSize / 2 + 'px');
        } else if ($scope.side == 'top' || $scope.side == 'bottom') {
          $scope.popoverElm.css($scope.side, -1 * (parseInt($scope.height) + pointerSize) + 'px');
          $scope.popoverElm.css('left', $scope.parentElm[0].clientWidth / 2 - parseInt($scope.width) / 2 + 'px');
          $scope.pointer.css('left', (parseInt($scope.width) + popoverPaddingSize * 2) / 2 - pointerSize + 'px');
        }
        $scope.popoverElm.append($scope.pointer);
        $scope.parentElm.on('mouseenter', function () {
          // $scope.popoverElm.css('display','block');
          $scope.popoverElm.removeClass('ng-hide');
        });
        $scope.parentElm.on('mouseleave', function () {
          // $scope.popoverElm.css('display','none');
          $scope.popoverElm.addClass('ng-hide');
        });
      }
    ],
    restrict: 'A'
  };
});