
//define angular module and their dependencies modules
angular.module('app', ['ngResource', 'ngRoute']);

//define the CLIENT side routes inside this module by calling the config function and using the route and location providers
angular.module('app').config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    $routeProvider
        .when('/', { templateUrl: '/partials/main', controller: 'mainCtrl'});
});


angular.module('app').controller('mainCtrl', function($scope) {
    $scope.myVar = "Hello Angular";
});
