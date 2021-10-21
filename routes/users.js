const express = require('express');

const router = express.Router();

const userController = require('../controllers/user_controller');

router.get('/profile', userController.profile);
router.get('/images', userController.images);
router.get('/signup', userController.signup);
router.get('/signin', userController.signin);

router.post('/user-entry', userController.user_entry);

module.exports = router;