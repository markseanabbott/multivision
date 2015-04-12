angular.module('app').controller('mvNavBarLoginCtrl', function($scope,$http,mvIdentity,mvNotifier,mvAuth){
  //pulls in the identity service to bring it into scope in order to use in the jade file
  $scope.identity = mvIdentity;
  $scope.signin=function(username,password){
    mvAuth.authenticateUser(username,password).then(function(success){
      if(success){
        mvNotifier.notify('success','you have successfully logged in!');
      } else {
        mvNotifier.notify('error','you have failed to logged in!');
      }
    })
  }
});
