{
    
     let createForm= function(){
        console.log("hello");
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault(); 
            $.ajax({
                type:'post',
                url:'/posts/create-post',
                data:newPostForm.serialize(),
                success: function(data){
                    console.log(data);
                    let newPostDom  = renderPost(data.data.post);
                    $('#posts-list-container>ul').prepend(newPostDom);
                    deletePost($(' .delete-post-button',newPostDom));
                },
                error:function(error){
                    console.log(error);
                }
            })
        })
     }

     let renderPost =function(post){
        return $(`
        <li  id="post-${post._id}">
        <p>
        <small>
            <a class ="delete-post-button" href="/posts/destroy/${post._id}">X</a>
        </small>
        ${ post.content }
        <br>
        <small>
            
        </small>
    </p>
    <div class="post-comments">
            <form action="/comments/create" method="POST">
                <input type="text" name="content" placeholder="Type Here to add comment..." required>
                <input type="hidden" name="post" value="${post.id}" >
                <input type="submit" value="Add Comment">
            </form>
        <div class="post-comments-list">
            <ul id="post-comments-${post.id}">
               
            </ul>
        </div>
    </div>
    
    </li> `)
      
     }

     let deletePost =function(deleteLink){
        $(deleteLink).click(
            function(e){
                e.preventDefault();
                $.ajax({
                    type:'get',
                    url:$(deleteLink).prop('href'),
                    success:function(data){
                        $(`#post-${data.data.post}`).remove();
                    },error:function(error)
                    {
                        console.log(error);
                    }
                })
            }
        )
     }

     createForm();
}
