const express= require('express');
const router= express.Router(); // making a router form express (like app)

const homeController= require('../controllers/home_controller'); //data imported from controller 

console.log('router loaded');

router.get('/', homeController.home);
router.get('/Images', homeController.homeImages);
router.use('/users' , require('./users'));  //transfer request to users.js if request contains /users
router.use('/posts' ,  require('./posts')); //transfer request to posts.js if request contains /posts

module.exports = router;