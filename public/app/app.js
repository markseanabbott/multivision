
//define angular module and their dependencies modules
angular.module('app', ['ngResource', 'ngRoute']);

//define the CLIENT side routes inside this module by calling the config function and using the route and location providers
angular.module('app').config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    //loads main.jade and uses the controller defined temporarily below.
    $routeProvider
        .when('/', { templateUrl: '/partials/main', controller: 'mvMainCtrl'});
});
