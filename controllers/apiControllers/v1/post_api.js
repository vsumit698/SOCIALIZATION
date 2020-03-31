const postModel = require('../../../models/postModel');
const commentModel = require('../../../models/commentModel');

module.exports.displayPost = async function(req,res){
    var allPosts = await postModel.find({}).sort('-createdAt').populate('user','name').populate({path:'comments', populate:{path:'user'}});

    return res.json(200,{
        message : "done !",
        post : allPosts
    });
}

module.exports.deletePost = async function(req,res){
    try {
        console.log("DONE");
        var post = await postModel.findById(req.params.postId);

        // req.user.id converts id in to String dataType ,  post.user.toString() converts 
        //                                                  user id in to String Data type
        if(post){
            if(req.user.id == post.user){
                post.remove();
    
                await commentModel.deleteMany({post : post._id});
    
                return res.json(200,{
                    message : "Post and associated comments deleted successfully !"
                });
                
            }
            return res.json(401 ,{
                message : "You are unauthorized to delete Post :(  !"
            });
        }
        return res.json(200,{
            message : "This Post Does Not exist :) "
        });

    } catch (error) {
        console.log("Error Found : ",error);
        res.json(200,{
            message : "Error in deleting Post at Server Side"
        });
    }
}