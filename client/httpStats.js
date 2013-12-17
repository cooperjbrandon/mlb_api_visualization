angular.module('mlbApp')
.factory('httpStats', function($q, $http) {

  var service = {
    getStats: function() {
      var d = $q.defer();
      $http({
        method: 'GET',
        url: '/stats',
        params: {playerID: 430912}
      }).success(function(data) {
        d.resolve(data);
      }).error(function(reason) {
        d.reject(reason);
      });
      return d.promise;
    },

    pitchCounter: function() {
      var d = $q.defer();
      $http({
        method: 'GET',
        url: '/pitchCount',
        params: {playerID: 430912}
      }).success(function(data) {
        d.resolve(data);
      }).error(function(reason) {
        d.reject(reason);
      });
      return d.promise;
    }

  };
  return service;
});