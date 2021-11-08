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

module.exports.deletePost = function(req, res){
    Post.findById(req.params.id, 
        function(error, fpost){
            if(error){console.log('error in finding the post');return;}
            
            //req.user.id is made by mongoose to compare it as string instead of req.user._id
            if(fpost.user == req.user.id){
                fpost.remove();

                Comment.deleteMany(
                    {post: req.params.id},
                    function(error){
                        if(error){console.log('error in deleting the comments for the post');return;}
                        return res.redirect('back');
                    }
                );
            }
            else{
                console.log('error: logged in user in not permitted to delete this post');
                return res.redirect('back');
            }
        }
    );
}