const Post = require('../models/post_model');
const Comment = require('../models/comment_model');


module.exports.postwall= async function (req, res){
    try{
        let post = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
        return res.render('postwall', {
            "title": "postwall",
            posted: post,
        });
    }
    catch(error){
        req.flash('error', error);
        return res.redirect('back');
    }
}

module.exports.createPost = async function(req, res){
    try{
        let newPost = await Post.create(
            {
                content : req.body.content,
                user : req.user._id, 
            }
        )

        if(req.xhr){
            await req.flash('info', 'post created');

            let post = await Post.findById(newPost._id)
            .populate('user');

            return res.status(200).json(
                {
                    data: {
                        post: post
                    },
                    message: "post created"
                }
            );
        }
        req.flash('info', 'post created');
        return res.redirect('back');
    }
    catch(err){
        req.flash('error', error);
        return res.redirect('back');
    }
}


module.exports.deletePost = async function(req, res){
    try{
        let f_post = await Post.findById(req.params.id); 

        //req.user.id is made by mongoose to compare it as string instead of req.user._id
        if(f_post.user == req.user.id){
            f_post.remove();
            await Comment.deleteMany( {post: req.params.id});
            
            if(req.xhr){
            
                await req.flash('info', 'post deleted'); 

                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: 'post deleted'
                });
            }

            req.flash('info', 'post deleted');
            return res.redirect('back');
        }
        else{
            req.flash('error', 'post cannot be deleted by logged in user');
            return res.redirect('back');
        }
    }
    catch(error){
        req.flash('error', error);
        return res.redirect('back');
    }
}

