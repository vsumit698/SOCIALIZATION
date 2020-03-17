var postForm = $('#post-form');

postForm.submit(function(event){
    event.preventDefault();
    $.ajax({
        type : 'post',
        url : '/user/post',
        data : postForm.serialize(),
        success : function(response){// this response is already in JSON format

            let newPost = editPost(response.data.post);
            // new post been created here...
            $('#your-post').prepend(newPost);

            addNoty('success','Successfully Posted !');
            deletePost($('.post-delete',newPost));
            var postId = response.data.post._id;
            var commentForm = $(`#comment-form-${postId}`);
            createComment(commentForm);
        },
        error : function(error){
            console.log(error.responseText);
        }
    });
});

function createComment(commentForm){// adding ajax call to submit commentForm data
    commentForm.submit(function(event){
        event.preventDefault();

        $.ajax({
            type : 'post',
            url : commentForm.prop('action'),
            data : commentForm.serialize(),
            success : function(response){ 
                var comment = response.data.comment;
                var commentJqueryObj = editComment(comment);// returns jquery comment object
                var commentList = $(`#comment-list-${comment.post}`);
                commentList.append(commentJqueryObj);
                addNoty('success','Commented On Post ! ');
                // add code for deleting comment
                deleteComment($('.delete-comment',`#${comment._id}`));
            },
            error : function(error){
                console.log("Error Occured ! ",error);
            }
        });
    });
}

function deleteComment(delCommLink){
    delCommLink.click(function(event){
        event.preventDefault();
        $.ajax({
            type:'get',
            url : delCommLink.prop('href'),
            success : function(response){
                var comment = response.data.comment;
                $(`#${comment._id}`).remove();
                addNoty('success','Comment Deleted :)');
            },
            error : function(error){
                console.log("Error Occured ! ",error);
            }
        });
    });
}

function editComment(comment){
    return  $(`<li id="${comment._id}">
                    <div> ${comment.content}</div>
                    <small>Commented By - ${comment.user.name}</small>
                    <a href="/user/post/delete-comment/${comment._id}" class="delete-comment">
                        <small>Remove</small>
                    </a>
                </li>`);
}

let convertPostsToAjax = function(){// add ajax request at click event on the previously created posts
    $('#your-post>li').each(function(){
        let post = $(this);
        let deleteLink = $('.post-delete',post);
        deletePost(deleteLink);
        // add ajax request at submit event on the previously created posts 
        var commentForm = $(`#comment-form-${post.prop('id')}`);
        createComment(commentForm);
    });
    // setting ajax call on previous created comments for deletion
    $('.delete-comment').each(function(){
        deleteComment($(this));
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

function editPost(post){ // this function returning JQUERY OBJECT
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
                    <form action="/user/post/comment" method="POST" id="comment-form-${post._id}">
                        <input type="text" name="content" placeholder="Add Comment Here ..." required> 
                        <input type="hidden" name="postId" value="${ post._id}" >
                        <button type="submit">Comment</button>
                    </form>
                </div>
                
                <!--          Comment Listing Section          -->
                <div>
                    <p>Comments on this post</p>
                    <ol type="i" id="comment-list-${post._id}">
                        
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