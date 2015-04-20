//this service is going to store the fact we are logged in and store the current user
angular.module('app').factory('mvIdentity', function($window, mvUser){
  //setting currentUser to undefined
  var currentUser;
  //if window.bootstrappedUserObject exists on the HTML render, then assign currentUser to the bootstrappeduser
  //otherwise leave undefined
  if ($window.bootstrappedUserObject) {
    currentUser=new mvUser();
    angular.extend(currentUser, $window.bootstrappedUserObject);
  }
  return{
    currentUser:currentUser,
    //this is a simple function that will allow me at any point to ask the service if we have
    //a successfully logged in user
    isAuthenticated: function(){
      return !! this.currentUser;
    },
    isAuthorized: function(role){
      return !! this.currentUser && this.currentUser.roles.indexOf(role) > -1;
    }
  }
})
