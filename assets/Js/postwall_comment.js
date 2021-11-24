{
    //method to submit the form for new comment using AJAX
    let createComment= function(){
        let CommentForm = $('#user-comment-form');

        CommentForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/comments/createComment',
                data: CommentForm.serialize(),
                success: function(data){
                    let newComment = CommentDom(data.data.comment);
                    $('#comment-list-container').prepend(newComment);
                    deleteComment($(' .delete-comment-button', newComment));
                },
                error: function(error){
                    console.log(error.responseText)
                }
            });
            $('textarea#comment-text').val('');
        });
    }

    //method to create the list element for prepending it in dom
    let CommentDom = function(comment){
        return $(
        `<li id="comment-${comment._id}">
            <p>
                ${comment.user.name} - ${comment.content}
                &emsp; 
                <a class="delete-comment-button" href="/posts/comments/deleteComment/${comment._id}">X</a>
            </p>
        </li>`);
    }

    //method to delete a post from dom
    let deleteComment = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
        
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    // console.log(data.data.comment_id);
                    $(`#comment-${data.data.comment_id}`).remove();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    createComment();
}