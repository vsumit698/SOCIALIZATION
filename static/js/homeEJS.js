var postForm = $('#post-form');

postForm.submit(function(event){
    event.preventDefault();
    $.ajax({
        type : 'post',
        url : '/user/post',
        data : postForm.serialize(),
        success : function(response){// this response is already in JSON format
            let newPost = editPost(response.data.post);
            $('#your-post').prepend(newPost);
            addNoty('success','Successfully Posted !');
            deletePost($('.post-delete',newPost));
        },
        error : function(error){
            console.log(error.responseText);
        }
    });
});
// add ajax request at click event on the previously created posts

let convertPostsToAjax = function(){
    $('#your-post>li').each(function(){
        let self = $(this);
        let deleteLink = $('.post-delete', self);
        deletePost(deleteLink);

        // // get the post's id by splitting the id attribute
        // let postId = self.prop('id').split("-")[1]
        // new PostComments(postId);
    });
}
convertPostsToAjax();

// deleteLink is the jQuery Object
function deletePost(deleteLink){

    deleteLink.click(function(event){

        event.preventDefault();
        $.ajax({
            type : 'get',
            url : deleteLink.prop('href'),
            success : function(response){
                let postId = response.data.postId;
                $(`#${postId}`).remove();
                addNoty('success','Post Deleted Successfully !')
            },
            error : function(error){
                console.log(error.responseText);
            }
        });

    });

};

function editPost(post){
    return $(`<li id="${post._id}">
                <div> 
                    <span class="post-content">
                        ${post.content}
                    </span>
                    <a href="/user/post/delete-post/${post._id}" class="post-delete"><small>Delete Post</small></a>
                </div>
                <div class="post-author"><small>Author - ${post.user.name}</small></div>
                <div class="post-date">
                    <small>Created At - ${post.createdAt}</small>
                </div>

                <!--          Comment Section (FORM)         -->

                <div>
                    <p>Add Comments - </p>
                    <form action="/user/post/comment" method="POST">
                        <input type="text" name="content" placeholder="Add Comment Here ..." required> 
                        <input type="hidden" name="postId" value="${ post._id}" >
                        <button type="submit">Comment</button>
                    </form>
                </div>
                
                <!--          Comment Listing Section          -->
                <div>
                    <p>Comments on this post</p>
                    <ol type="i" id="commentList-${post._id}">
                        
                    </ol>
                </div>
                <hr>
            </li>`);
}

function addNoty(messageType,textData){
    new Noty({
        type: messageType,
        text: textData,
        layout : "topCenter",
        timeout : 1500,
        theme : 'relax'
    }).show();
}


// ajax request via plain JS
// var postForm = document.getElementById('post-form');
// var postFormVal = document.getElementsByClassName("post-form-value");

// postForm.onsubmit = function(event){
//     event.preventDefault();

//     // var data = new FormData();

//     // data.append(postFormVal[0].name, postFormVal[0].value);
//     console.log("print",postFormVal[0].name+"="+postFormVal[0].value);
//     var xhr = new XMLHttpRequest();
//     xhr.onload = function(){
//         console.log(JSON.parse(xhr.response));
//     };
//     xhr.onerror = function(){
//         console.log("Error happened !");
//     };
//     xhr.open("post","/user/post",true);

//     xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");// for setting sending data to body object of request
//     xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");//for differentiating ordinary vs ajax request

//     xhr.send(postFormVal[0].name+"="+postFormVal[0].value);
// }