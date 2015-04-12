//this service is going to store the fact we are logged in and store the current user
angular.module('app').factory('mvIdentity', function(){
  return{
    currentUser:undefined,
    //this is a simple function that will allow me at any point to ask the service if we have
    //a successfully logged in user
    isAuthenticated: function(){
      return !!this.currentUser;
    }
  }
})
