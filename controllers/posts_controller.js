const Post = require('../models/post_model');

module.exports.postwall=function (req, res){
    res.render('postwall', {
        "title": "postwall"
    });
}

module.exports.createPost = function(req, res){
    Post.create(
        {
            content : req.body.content,
            user : req.user._id, 
        },
        function (error , post){
            if(error){console.log('error in creating a new post'); return;}

            return res.redirect('back');
        }
    );
}