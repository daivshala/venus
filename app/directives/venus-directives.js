angular.module('venusUI', []);

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

angular.module('venusUI').directive('venusBreadcrumbs', function(){
	// Runs during compile
	return {
		scope: {
			steps: '='
		}, // {} = isolate, true = child, false/undefined = no change
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: 'directives/venus-breadcrumbs-template.html',
		controller: function($scope, $rootScope, $location) {
			$scope.$watchCollection('steps',function(){
				$scope.updateActiveStep();
			});

			$scope.$on('$locationChangeSuccess', function (event, newLoc, oldLoc){
				$scope.updateActiveStep();
			});

			$scope.updateActiveStep = function(){
				if(!$scope.steps){
					return;
				}

				for (var i = $scope.steps.length - 1; i >= 0; i--) {
					if($location.path().indexOf($scope.steps[i].url) > -1){
						$scope.steps[i].visited = true;
						$scope.currentStep = $scope.steps[i];
					}
				};
			}

			$scope.stepClicked = function(step){
				if(step.visited){
					$location.path(step.url);
				}
			}
		},
		link: function($scope, iElm, iAttrs, controller) {

		}
	};
});

angular.module('venusUI').directive('venusAddressField', ['VenusActivityIndicatorService',function(VenusActivityIndicatorService){
	// Runs during compile
	return {
		scope: {
			model: '=',
			isValidCallback: '&',
			saveCallback: '&'
		}, // {} = isolate, true = child, false/undefined = no change
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: 'directives/venus-field-address-template.html',
		controller: function($scope,$rootScope, $element, $attrs, $transclude, $http) {
			if(!$scope.model){
				$scope.model = {};
			}

			$scope.isEditMode = false;

			$scope.edit = function(){
				$scope.isEditMode = true;
			}

			$scope.save = function(){
				$scope.isEditMode = false;
				$scope.saveCallback();
			}
			$scope.$watch('userForm.$valid',function(){
				if($scope.userForm.$valid){
					$scope.isEditMode = false;
				}else{
					$scope.isEditMode = true;
				}

				$scope.isValidCallback({isValid: $scope.userForm.$valid});
			});

			$scope.$watch('model.zipcode',function(){
				if(!$scope.model.zipcode){
					return;
				}

				if($scope.model.zipcode.length == 8){
					VenusActivityIndicatorService.startActivity('Consultando CEP...');
					$http.jsonp('http://correiosapi.apphb.com/cep/' + $scope.model.zipcode + '?callback=JSON_CALLBACK')
					.success(function(response){
						VenusActivityIndicatorService.stopActivity('Consultando CEP...');
						$scope.model.neighborhood = response.bairro;
						$scope.model.city = response.cidade;
						$scope.model.state = response.estado;
						$scope.model.street = response.tipoDeLogradouro + ' ' + response.logradouro;
					})
					.error(function(error){
						VenusActivityIndicatorService.stopActivity('Consultando CEP...');
						VenusActivityIndicatorService.error('Problema ao consultar CEP, tente novamente.');
					});
				}
			});

			$scope.findZipCode = function(){
				window.open('http://www.buscacep.correios.com.br/servicos/dnec/menuAction.do?Metodo=menuLogradouro');
			};
		},
		link: function($scope, iElm, iAttrs, controller) {

		}
	};
}]);

angular.module('venusUI').directive('venusActivityIndicator', ['VenusActivityIndicatorService', function(VenusActivityIndicatorService){
	// Runs during compile
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude,VenusActivityIndicatorService) {
			$scope.activities = VenusActivityIndicatorService.activities;
			$scope.errors = VenusActivityIndicatorService.errors;

			$scope.clearError = function(error){
				VenusActivityIndicatorService.clearError(error);
			}
		},
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: 'directives/venus-activity-indicator.html',
		link: function($scope, iElm, iAttrs, controller) {}
	};
}]);