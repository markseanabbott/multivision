angular.module('app').factory('mvAuth', function($http, mvIdentity, $q){
  return {
    authenticateUser:function(username, password){
      //create a new deferred using the queue object?
      var dfd = $q.defer();
      $http.post('/login',{username:username,password:password}).then(function(response){
        if(response.data.success){
          //sets the identify service to the current successfully logged in user to
          //response.data.user
          mvIdentity.currentUser = response.data.user;
          dfd.resolve(true);
        }else{
          dfd.resolve(false);
        }
      });
      return dfd.promise;
    }
  }
});
