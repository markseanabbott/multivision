
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
        .when('/', { templateUrl: '/partials/main/main', controller: 'mvMainCtrl'})
        //add second route control for /admin/users which calls the template partial user-list and the controller, controller needs to be added to scripts as well
        .when('/admin/users', { templateUrl: '/partials/admin/user-list',
          controller: 'mvUserListCtrl',
          resolve: {
            auth: function(mvIdentity,$q){
              if(mvIdentity.currentUser && mvIdentity.currentUser.roles.indexOf('admin') > -1){
                return true;
              } else {
                $q.reject('not authorized');
              }
            }
          }
      });

});

angular.module('app').run(function($rootScope,$location){
  $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
    if(rejection === 'not authorized'){
      $location.path('/');
    }
  })
})
