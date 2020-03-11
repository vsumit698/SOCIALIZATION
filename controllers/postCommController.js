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