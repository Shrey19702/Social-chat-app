const passport= require('passport');
const LocalStrategy = require('passport-local').Strategy;   //passport local package <for setting up local files> 
const User = require('../models/user_model');   // users data model

//authentication using passport
passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    function(email, password, done){
        //find a user and establish identity
        User.findOne(
            {email:email},
            function(error, f_user){
                if(error){
                    console.log('error in finding user');
                    return done(error);
                }
                if(!f_user || f_user.password!=password){
                    console.log('Invalid username or email');
                    return done(null, false);
                }

                return done(null, f_user);
            }
        );
    }
));

//serializing
passport.serializeUser(
    function(user, done){
        done(null, user.id);
    }
);

//deserializing
passport.deserializeUser(function(id,done){
    User.findById(id, 
        function(error, f_user){
            if(error){
                console.log('error in finding user');
                return done(error);
            }

            return done(null, f_user);
        }
    );
});

//check if the user is authenticated (signed in)
passport.checkAuthentication = function(req,res, next){
    // if the user is signed in pass the request to the next function(controller's action)
    if(req.isAuthenticated()){
        res.locals.user = req.user;
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/signin');

}


passport.setAuthenticatedUser = function(req,res, next){
    // req.user contains the current signed in user from the session cookie and we are sending this to locals for the views
    if(req.isAuthenticated()){
        res.locals.user = req.user; //passing users data from request to response
    }
    next();
}


module.exports = passport;