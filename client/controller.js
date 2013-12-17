angular.module('mlbApp')
.controller('MainController', function($scope, httpStats, parseXML) {
	$scope.hello = "hi";
	$scope.stats = function () {
		httpStats.getStats()
  	.then(function(data) {
  		return data;
  	})
  	.then(function(xml) {
  		var json = parseXML.xml2json(xml, '			');
  		return json;
  	})
  	.then(function(stats) {
  			$scope.stats = JSON.parse(stats);
  			console.log($scope.stats);
  	});
	};
})
.controller('MLBController', function($scope) {
  
});