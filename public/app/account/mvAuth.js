angular.module('app').factory('mvAuth', function($http, mvIdentity, $q, mvUser){
  return {
    authenticateUser:function(username, password){
      //create a new deferred using the queue object?
      var dfd = $q.defer();
      $http.post('/login',{username:username,password:password}).then(function(response){
        if(response.data.success){
          //sets the identify service to the current successfully logged in user to
          //response.data.user
          var user = new mvUser();
          //will take the http post data we used in post and place it into the user object
          angular.extend(user, response.data.user);
          mvIdentity.currentUser = user;
          dfd.resolve(true);
        }else{
          dfd.resolve(false);
        }
      });
      return dfd.promise;
    },
    logoutUser:function(){
      var dfd = $q.defer();
      $http.post('logout',{logout:true}).then(function(){
        //change the identity to undefined
        mvIdentity.currentUser=undefined
        dfd.resolve();
      });
      return dfd.promise;
    }
  }
});
