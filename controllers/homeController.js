const postModel = require('../models/postModel');
const userModel = require('../models/userModel');

module.exports.home = function(req,res){
    // res.clearCookie("user_id");
    if(req.isAuthenticated()){
        postModel.find({})
        .populate('user')
        .populate({path: 'comments',populate: { path: 'user'}})
        .exec(function(err,post){
            if(err){
                console.log("error in finding posts of user",err);
                return;
            }
            userModel.find({},function(err,allUsers){
                if(err){
                    console.log("error in finding users of Socialization",err);
                    return;
                }
                
                for(var i in allUsers){
                    if(allUsers[i].id == req.user.id){
                        allUsers.splice(i,1);
                        break;
                    }
                }
                console.log(allUsers)
                res.render('home',{title:"Socialization",userPost:post,userFriends : allUsers});
            });
            
        });
    }
    else{
        res.render('home',{title:"Socialization"});
    }
}
