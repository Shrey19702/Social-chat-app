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
                        if(error){console.log('eror in adding comment'); return;}
            
                        fpost.comments.push(comment);    //add the given comment to the comment array in hte post db
                        fpost.save(); // save the changes in the db

                        return res.redirect('back');
                    }
                )
            }
        }
    );
    
}