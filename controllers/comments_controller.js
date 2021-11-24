const Comment = require('../models/comment_model');
const Post = require('../models/post_model');


module.exports.createComment= async function(req, res){
    try{
        let fpost = await Post.findById(req.body.post);
        if(fpost){
            let comment = await Comment.create(
                {
                    content: req.body.content,
                    user : req.user._id, 
                    post : req.body.post,
                }
            );
            fpost.comments.push(comment);    //add the given comment to the comment array in hte post db
            fpost.save(); // save the changes in the db
        }
        req.flash('info', 'comment created');
        return res.redirect('back');
    }
    catch(error){
        req.flash('error', error);
        return res.redirect('back');
    }
}
 

module.exports.deleteComment= async function(req, res){
    try{
        let f_comment = await Comment.findById(req.params.id);
        if(f_comment.user == req.user.id){
            let postId = f_comment.post;
            f_comment.remove();

            let f_post = await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id} });
            req.flash('info', 'comment deleted');
            return res.redirect('back');
        }
        else{
            req.flash('error', 'error: logged in user in not permitted to delete this comment');
            return res.redirect('back');
        }    
    }
    catch(error){
        req.flash('error', error);
        return res.redirect('back');
    }
}
