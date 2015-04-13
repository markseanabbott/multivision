angular.module('app').factory('mvUser', function($resource) {
  var UserResource = $resource('/api/users/:id', {_id: "@id"});

  UserResource.prototype.isAdmin = function() {
    return this.roles && this.roles.indexOf('admin') > -1;
  }
  UserResource.prototype.isGm = function() {
    return this.roles && this.roles.indexOf('gm') > -1;
  }
  return UserResource;
});
