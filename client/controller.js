angular.module('mlbApp')
.controller('MainController', function($scope, httpStats) {
	$scope.hello = "hi";
	$scope.stats = function () {
		httpStats.getStats()
  	.then(function(data) {
  		$scope.stats = data;
  		console.log($scope.stats);
  	});
	};
})
.controller('MLBController', function($scope) {
  
});