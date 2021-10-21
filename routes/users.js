const express = require('express');

const router = express.Router();

const userController = require('../controllers/user_controller');

router.get('/profile', userController.profile);
router.get('/images', userController.images);
router.get('/signup', userController.signup);
router.get('/signin', userController.signin);

router.post('/user-creation', userController.user_creation);
router.post('/user-session', userController.user_session);

module.exports = router;