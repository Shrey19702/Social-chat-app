const Comment = require('../models/comment_model');
const Post = require('../models/post_model');

module.exports.createComment= function(req, res){
    Post.findById(req.body.post,
        function(error, fpost){
            if(error){console.log('error in finding the post to comment on'); return;}

            else if(fpost){
                Comment.create(
                    {
                        content: req.body.content,
                        user : req.user._id, 
                        post : req.body.post,
                    },
                    function(error, comment){
                        if(error){console.log('error in adding comment'); return;}
            
                        fpost.comments.push(comment);    //add the given comment to the comment array in hte post db
                        fpost.save(); // save the changes in the db

                        return res.redirect('back');
                    }
                )
            }
        }
    );   
}

module.exports.deleteComment= function(req, res){
    Comment.findById(req.params.id, 
        function(error, fcomment){
            if(error){console.log('error in deleting comment');return;}
            if(fcomment.user == req.user.id){
                let postId = fcomment.post;
                fcomment.remove();

                Post.findByIdAndUpdate(postId,
                    { $pull: {comments: req.params.id} },
                    function(error, fpost){
                        if(error){console.log('error in deleting comment from post list');return;}
                        return res.redirect('back');
                    } 
                );
            }
            else{
                console.log('error: logged in user in not permitted to delete this comment');
                return res.redirect('back');
            }
        }    
    );
}