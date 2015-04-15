angular.module('app').controller('mvNavBarLoginCtrl', function($scope,$http,mvIdentity,mvNotifier,mvAuth,$location){
  //pulls in the identity service to bring it into scope in order to use in the jade file
  $scope.identity = mvIdentity;
  $scope.signin=function(username,password){
    mvAuth.authenticateUser(username,password).then(function(success){
      if(success){
        mvNotifier.notify('success','you have successfully logged in!');
      } else {
        mvNotifier.notify('error','you have failed to logged in!');
      }
    });
  }
  //create a methout that allow signout. This is activated by the ng-click call from navbar-login.jade
  $scope.signout=function() {
    //calls the logout user frunction from the mvAuth service
    mvAuth.logoutUser().then(function() {
      //clear username and password fields
      $scope.username = "";
      $scope.password = "";
      //notify a successful logout
      mvNotifier.notify('success','You have successfully signed out!');
      //return to the root of the website upon successful logout
      $location.path('/');
    })
  }
});
