{
    //method to submit the form for new post using AJAX
    let createPost= function(){
        let PostForm = $('#user-post-form');

        PostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/createPost',
                data: PostForm.serialize(),
                success: function(data){
                    let newPost = postDom(data.data.post);
                    $('#post-list-container').prepend(newPost);
                },
                error: function(error){
                    console.log(error.responseText)
                }
            });
        });
    }

    let postDom = function(post){
        // console.log(post.user);
        return $(
        `<li id="post-${post._id}">
            <div>
                <p>
                    ${post.content} 
                    &nbsp; 
                    <a class="delete-post-button" href="/posts/deletePost/${post.id}">X</a>
                </p>
                <p>${post.user.name}</p>
            </div>
            <div>
                <form action="/posts/comments/createComment" method="post" >
                    <textarea name="content" id="comment-text" placeholder="comment something" cols="30" rows="3"></textarea>
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Comment">
                </form>
                <p>Comments</p>
                <ul>
                </ul>
            </div>
        </li>`);
    }

    createPost();
}