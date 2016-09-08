'use strict';

angular.module('venus')
.filter('unsafe', function ($sce) {
    return function (content) {
        return $sce.trustAsHtml(content);
    };
});
