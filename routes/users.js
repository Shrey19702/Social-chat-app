const express = require('express');
const passport = require('passport');

const router = express.Router();

const userController = require('../controllers/user_controller');

router.get('/profile', userController.profile);
router.get('/images', userController.images);
router.get('/signup', userController.signup);
router.get('/signin', userController.signin);

router.post('/user-creation', userController.user_creation);

router.post(
    '/user-session',
    passport.authenticate(
        'local',
        {failureRedirect: '/users/signin'}
    ),
    userController.user_session
);

module.exports = router;