var passport = require('passport');
module.exports = function(app) {
  //routing sub section. The catch all route should remain at the end. Which will catch all routes if they arent defined previously

  //this defines the routes for partials. this will render the sub file name under the partials directory
  //using * to ignify to open any partial sub directory file
  //using req.params[0] to open the 0th file
  //essentially fixing the routing to adapt to the new sub folder directory in the partials directory
  app.get('/partials/*', function(req, res) {
    res.render('../../public/app/' + req.params[0]);
  });
//middleware that authenticates the return value from passport.authenticate.
  app.post('/login', function(req, res, next) {
    var auth = passport.authenticate('local', function(err, user) {
      if (err) {return next(err);}
      if (!user) {res.send({success: false})}
      req.logIn(user, function(err){
        if (err) {return next(err);}
          res.send({success:true, user:user});
      })
    })
    auth(req,res,next);
  });
  //add route for ALL. This essentially makes the client side the routing tool. This is the index view
  app.get('*', function(req, res) {
    res.render('index');
  });
}
