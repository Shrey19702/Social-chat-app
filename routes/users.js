const express = require('express');
const passport = require('passport'); // passport functions are required for authentication , check if authenticated

const router = express.Router(); // router to handle request (like app)

const userController = require('../controllers/user_controller'); // controller for users

router.get('/profile', passport.checkAuthentication ,userController.profile); //first check for authentication using func.1 then the func.1 calls for profile(func2) if checked right 
router.get('/images', userController.images);
router.get('/signup', userController.signup);   //page for user signup
router.get('/signin', userController.signin);   // page for user signin
router.get('/signout', userController.user_end_session);    //signing out the user (removing cookies)

router.post('/user-creation', userController.user_creation);  // creating a new user

router.post(        // signing in the user (authenticating the user, storing user cookies)
    '/user-session',
    passport.authenticate(  //func 1(check if a user is already signed in)
        'local',
        {failureRedirect: '/users/signin'}
    ),
    userController.user_session //func2 sign in the user
);

module.exports = router;