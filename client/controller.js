angular.module('mlbApp')
.controller('MainController', function($scope, $http) {
	$scope.hello = "hi";
	$scope.stats = function () {
		$http({
    	method: 'GET',
    	url: '/stats'
  	})
  	.then(function(data) {
  		$scope.stats = data.data;
  	});
	};
})
.controller('MLBController', function($scope) {
  
});