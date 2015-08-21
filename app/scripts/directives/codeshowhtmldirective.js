angular.module('venus-showcase').directive('codeShow', function ($compile, $http) {
    return {
        templateUrl: 'views/code-show.html',
        restrict: 'E',
        scope: {
            file: '@',
            render: "@"
        },
        controller: function() {

        },
        link: function(scope, elt, attrs) {
            $http.get(attrs.file)
                .then(function (response) {
                    scope.codeAsText = response.data;
                    if (attrs.render) {
                        var element = angular.element(scope.codeAsText);
                        var test = $compile(element)(scope.$parent);
                        elt.prepend(test);
                    }
                })
                .catch(function (error) {
                    console.error('Error trying to load the file ' + $scope.file, error);
                });
        }
    };
});
