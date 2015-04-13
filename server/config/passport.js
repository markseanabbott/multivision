var mongoose = require('mongoose'),
  passport = require('passport'),
  //Strategy defines how the server will implement the authenticate. Local strategy is local.
  LocalStrategy = require('passport-local').Strategy,
  User = mongoose.model('User');

module.exports = function(){
  //in order to look up the user we first need to grab the user model

  passport.use(new LocalStrategy(
    //brings in the User model created in mongoose.js
    //uses username, password and the done callback to verify the user exists
    function(username, password, done) {
      User.findOne({username: username}).exec(function(err, user) {
        //users the userSchema method object to ensure user is authenticated
        //passing password field from form to object
        if (user && user.authenticate(password)) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
    }
  ));

  //serialize and seserialize user is applied throughout the session history of the user
  //In this example, only the user ID is serialized to the session,
  //keeping the amount of data stored within the session small.
  //When subsequent requests are received, this ID is used to find the user,
  //which will be restored to req.user.
  passport.serializeUser(function(user, done) {
    if (user) {
      done(null, user._id);
    }
  });
  passport.deserializeUser(function(id, done) {
    User.findOne({_id: id}).exec(function(err, user) {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  });
}
