//service that wraps around toastr service

//wrap toastr inside of a service.

angular.module('app').value('mvToastr', toastr)

//notifier service based on toastr
angular.module('app').factory('mvNotifier', function(mvToastr){
  return{
    notify: function(type,msg) {
      if (type==="success"){
        mvToastr.success(msg);
      } else {
        mvToastr.error(msg);
      }      
      console.log(msg);
      }
    }
});
