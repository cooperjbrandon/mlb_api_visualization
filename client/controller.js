angular.module('mlbApp')
.controller('MainController', function($scope, httpStats, parseXML) {
	$scope.hello = "hi";
	$scope.stats = function () {
		httpStats.getStats()
  	.then(function(data) {
  		return data;
  	})
  	.then(function(xml) {
  		var json = parseXML.xml2json(xml, '      ');
  		return json;
  	})
  	.then(function(stats) {
  		$scope.stats = JSON.parse(stats);
  		console.log($scope.stats);
  	});
	};
	$scope.pitchCount = function () {
		httpStats.pitchCounter()
  	.then(function(data) {
  		return data;
  	})
  	.then(function(xml) {
  		var json = parseXML.xml2json(xml, '      ');
  		return json;
  	})
  	.then(function(stats) {
  		$scope.pitch = JSON.parse(stats);
  		console.log($scope.pitch);
  	});
	};
	$scope.myData = [10,20,30,40,60];
})
.controller('MLBController', function($scope) {
  
});