var auth = require('./auth'),
  mongoose=require('mongoose'),
  User = mongoose.model('User');

module.exports = function(app) {
  //adds route for api/users which first checks the users ROLE against admin. This is performed in auth.js
  //if the user is admin, it will display the page which is the user collection pulled from mongoose.
  app.get('/api/users',auth.requiresRole("admin"), function(req,res){
    User.find({}).exec(function(err,collection){
      res.send(collection);
    })
  });
  //routing sub section. The catch all route should remain at the end. Which will catch all routes if they arent defined previously

  //this defines the routes for partials. this will render the sub file name under the partials directory
  //using * to ignify to open any partial sub directory file
  //using req.params[0] to open the 0th file
  //essentially fixing the routing to adapt to the new sub folder directory in the partials directory
  app.get('/partials/*', function(req, res) {
    res.render('../../public/app/' + req.params[0]);
  });
//bring in the auth function from auth.js where authentication occurs.
  app.post('/login', auth.authenticate);
//logout route that will work within the auth service created in myAuth.js
  app.post('/logout', function(req,res){
    req.logout();
    res.end();
  });
  //adding route that passes the user data to the index page

  //add route for ALL. This essentially makes the client side the routing tool. This is the index view
  app.get('*', function(req, res) {
    res.render('index', {
      //passing username to front end from back end where the user currently exists
      bootstrappedUser:req.user
    });
  });
}
