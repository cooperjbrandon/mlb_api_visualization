angular.module('mlbApp')
.controller('MainController', function AppCtrl ($scope, httpStats, parseXML, pitchTypeCount, pitchMe) {
	$scope.totalPitches = 0;
	$scope.options = {width: 500, height: 300};
  $scope.data = [1,2,3,4];
  $scope.circledata = [];
  $scope.hovered = function(d){
      $scope.barValue = d;
      $scope.$apply();
  };
  $scope.barValue = 'None';
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
  		$scope.pitchInfo = pitchMe.analyze($scope.stats);
  		$scope.pitchCount();
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
  		$scope.totalPitches = pitchTypeCount.analyze($scope.pitch);
  		$scope.circledata = $scope.pitchInfo.slice(0, $scope.totalPitches);
  		console.log($scope.circledata);
  	});
	};
})
.controller('MLBController', function($scope) {
  
})
.directive('barChart', function(){
	var chart = d3.custom.barChart();
	return {
		restrict: 'E',
		replace: true,
		template: '<div class="chart"></div>',
		scope:{
			height: '=height',
			data: '=data',
			hovered: '&hovered'
		},
		link: function(scope, element, attrs) {
			var chartEl = d3.select(element[0]);
			chart.on('customHover', function(d, i){
				scope.hovered({args:d});
			});

			scope.$watch('data', function (newVal, oldVal) {
				chartEl.datum(newVal).call(chart);
			});

			scope.$watch('height', function(d, i){
				chartEl.call(chart.height(scope.height));
			})
		}
	}
})
.directive('chartForm', function(){
	return {
		restrict: 'E',
		replace: true,
		controller: function AppCtrl ($scope) {
			$scope.update = function(d, i){ $scope.data = randomData(); };
			function randomData(){
				return d3.range(~~(Math.random()*50)+1).map(function(d, i){return ~~(Math.random()*1000);});
			}
		},
		template: '<div class="form">' +
		'Height: {{options.height}}<br />' +
		'<input type="range" ng-model="options.height" min="100" max="800"/>' +
		'<br /><button ng-click="update()">Update Data</button>' +
		'<br />Hovered bar data: {{barValue}}</div>'
	}
})
.directive('circlechart', function(){
	var chart = d3.custom.circleChart();
	return {
		restrict: 'E',
		replace: true,
		template: '<div class="circleChart"></div>',
		scope:{
			circledata: '=circledata'
		},
		link: function(scope, element, attrs) {
			var chartEl = d3.select(element[0]);

			scope.$watch('circledata', function (newVal, oldVal) {
				console.log("bobyouncle",chartEl.datum(newVal))
				chartEl.datum(newVal).call(chart);
			});
		}
	}
});