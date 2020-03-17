const postModel = require('../models/postModel');
const commentModel = require('../models/commentModel');

module.exports.createPost = async function(req,res){
    if(req.isAuthenticated()) {
        try {

            var post = await postModel.create({content:req.body.content,user: req.user._id});

            post = await postModel.findById(post.id).populate('user','name');
            
            if (req.xhr){
                
                return res.status(200).json({
                    data: {
                        post: post
                    },
                    message: "Post created!"
                });
            }

            req.flash('success','Successfully Posted');
        } catch (error) {
            req.flash('error',error);
            console.log("Error Found : ",error);
        }
    }
    res.redirect('back');
}

module.exports.createComment = async function(req,res){
    if(req.isAuthenticated()){
        try {

            var post = await postModel.findById(req.body.postId);
            if(post){// post is present in the database
                let comment = await commentModel.create({content : req.body.content, 
                                                        user : req.user._id,
                                                        post : req.body.postId});
                post.comments.push(comment._id);
                post.save();
                await comment.populate('user','name').execPopulate();
                if(req.xhr){
                    return res.status(200).json({
                        data : {
                            comment:comment
                        },
                        message : "comment created !"
                    });
                }

                req.flash('success','Successfully Commented');
            }

        } catch (error) {
            req.flash('error',error);
            console.log("Error Found : ",error);
        }

        
    }
    res.redirect('back');
}

module.exports.deletePost = async function(req,res){
    if(req.isAuthenticated()){
        try {
            var post = await postModel.findById(req.params.postId);

            // req.user.id converts id in to String dataType ,  post.user.toString() converts 
            //                                                  user id in to String Data type
            if(req.user.id == post.user.toString()){
                post.remove();
                await commentModel.deleteMany({post : req.params.postId});

                if(req.xhr){
                    return res.status(200).json({
                        data : {
                            postId : post.id
                        },
                        message : "Post Deleted !"
                    });
                }

                req.flash('success','Successfully Deleted Post And Comments');
            }
        } catch (error) {
            req.flash('error',error);
            console.log("Error Found : ",error);
        }
    }
    res.redirect('back');
}

module.exports.deleteComment = async function(req,res){ // using async await feature
    if(req.isAuthenticated()){
        try {
            var comment = await commentModel.findById(req.params.commentId);

            if(comment){
                var post = await postModel.findById(comment.post);
                
                if(post.user==req.user.id || comment.user==req.user.id){
                    var commArr = post.comments; 
                    for(let id in commArr){
                        if(commArr[id] == comment.id){
                            commArr.splice(id,1);// deleted comment from commentArr of postDocument of postModel
                            console.log("deleted");
                            break;
                        }
                    }
                    post.save();
                    comment.remove();
                    
                    if(req.xhr){
                        console.log("Comment deleted ......")
                        return res.status(200).json({
                            data : {
                                comment : comment
                            },
                            message : "Comment Deleted !"
                        });
                    }

                    req.flash('success','Successfully Comment Deleted');
                }
            }
        } catch (error) {
            req.flash('error','Error in Deleting Comment');
            console.log("Error Found",error);
        }
    }

    res.redirect('back');
};