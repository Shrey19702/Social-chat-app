const express = require('express');
const router = express.Router(); // using router from express to handle request (like app) 
const passport = require('passport');

const CommentController = require('../controllers/comments_controller'); // controller to call for request

router.post('/createComment' ,passport.checkAuthentication ,CommentController.createComment);
router.get('/deleteComment/:id',passport.checkAuthentication ,CommentController.deleteComment);

module.exports = router;
