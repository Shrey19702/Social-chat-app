const Post = require('../models/post_model');
const Comment = require('../models/comment_model');

module.exports.postwall=function (req, res){

    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(
        function(error, post){
            if(error){console.log('erorr in printing posts'); return;}
            // console.log(post);
            return res.render('postwall', {
                "title": "postwall",
                "posted": post
            });
        }
    )
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