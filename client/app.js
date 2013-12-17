angular.module('mlbApp', [
  'ngRoute'
])
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'MainController',
      templateUrl: 'templates/main.html'
    })
    .when('/mlb', {
      controller: 'MLBController',
      templateUrl: 'templates/MLB.html'
    })
    .otherwise({
      redirectTo: '/'
    })
})
.directive('barsChart', function ($parse) {
 //explicitly creating a directive definition variable
 //this may look verbose but is good for clarification purposes
 //in real life you'd want to simply return the object {...}
  var directiveDefinitionObject = {
     //We restrict its use to an element
     //as usually  <bars-chart> is semantically
     //more understandable
     restrict: 'E',
     //this is important,
     //we don't want to overwrite our directive declaration
     //in the HTML mark-up
     replace: true,
     template: '<div id="chart"></div>',
     link: function (scope, element, attrs) {
       //converting all data passed thru into an array
       var data = attrs.data.split(','),
           chart = d3.select('#chart')
             .append("div").attr("class", "chart")
             .selectAll('div')
             .data(data).enter()
             .append("div")
             .transition().ease("elastic")
             .style("width", function(d) { return d + "%"; })
             .text(function(d) { return d + "%"; });
       //a little of magic: setting it's width based
       //on the data value (d) 
       //and text all with a smooth transition
     } 
  };
  return directiveDefinitionObject;
});