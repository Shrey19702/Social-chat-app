const passport= require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user_model');

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

module.exports = passport;