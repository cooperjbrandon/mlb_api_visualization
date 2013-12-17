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
});