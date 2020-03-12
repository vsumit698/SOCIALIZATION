const postModel = require('../models/postModel');
const commentModel = require('../models/commentModel');

module.exports.createPost = function(req,res){
    if(req.isAuthenticated()) postModel.create({content:req.body.content,user: req.user._id});
    res.redirect('back');
}

module.exports.createComment = function(req,res){
    if(req.isAuthenticated()){
        postModel.findById(req.body.postId,function(err,post){
            if(err) {
                console.log("error in finding post",err);
                return;
            }
            if(post){// post is present in the database
                commentModel.create({
                    content : req.body.content,
                    user : req.user._id,
                    post : req.body.postId
                },function(err,comment){
                    if(err){
                        console.log("error in creating comment",err);
                        return;
                    }
                    post.comments.push(comment._id);
                    post.save();
                });

            }
        });
    }
    res.redirect('back');
}

module.exports.deletePost = function(req,res){
    if(req.isAuthenticated()){
        postModel.findById(req.params.postId,function(err,post){
            if(err) {
                console.log("Error in finding post By ID",err);
                return;
            }
            // req.user.id converts id in to String dataType ,  post.user.toString() converts 
            //                                                  user id in to String Data type
            if(req.user.id == post.user.toString()){
                post.remove();
                commentModel.deleteMany({post : req.params.postId},function(err){
                    // compulsory add callback function to perform delete operation 
                    if(err) {
                    console.log("error in deleting comments",err);
                    return;
                    }
                });
            }
            
           
        });
    }
    res.redirect('back');
}

module.exports.deleteComment = function(req,res){
    if(req.isAuthenticated()){
        commentModel.findById(req.params.commentId,function(err,comment){
            if(err){
                console.log("error in finding comments",err);
                return;
            }
            if(comment){
                postModel.findById(comment.post,function(err,post){
                    if(err){
                        console.log("error in finding post",err);
                        return;
                    }
                    if(post.user==req.user.id || comment.user==req.user.id){
                        var commArr = post.comments; 
                        for(let id in commArr){
                            if(commArr[id] == comment.id){
                                commArr.splice(id,1);// deleted comment from commentArr of postDocument
                                console.log("deleted");
                                break;
                            }
                        }
                        post.save();
                        comment.remove();
                    }
                });
                
            }
        })
    }
    res.redirect('back');
};