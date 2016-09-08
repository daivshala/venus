'use strict';

angular.module('venus')
.directive('progressBar', function () {
    return {
        restrict: 'EA',
        scope   : {
            progressValue  : '=',
            progressOptions: '=?'
        },
        link    : function (scope, element) {
            element.addClass('venus progress');

            if (scope.progressOptions && scope.progressOptions.size) {
                element.addClass('progress--' + scope.progressOptions.size.toString());
            }
        },
        templateUrl: 'directives/ProgressBarDirectiveTemplate.html'
    };
});
