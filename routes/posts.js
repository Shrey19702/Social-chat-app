const express = require('express');
const router = express.Router(); // using router from express to handle request (like app) 

const postController = require('../controllers/posts_controller'); // controller to call for request

router.get('/postwall', postController.postwall);

module.exports = router;
