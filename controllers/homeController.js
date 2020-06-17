const postModel = require('../models/postModel');
const userModel = require('../models/userModel');

module.exports.home = async function(req,res){
    // res.clearCookie("user_id");
    if(req.isAuthenticated()){
        try {
            var post = await postModel.find({}).sort('-createdAt').populate('user','-password').populate({path: 'comments',populate: { path: 'user'}});
    
            var allUsers = await userModel.find({});

            for(var i in allUsers){
                if(allUsers[i].id == req.user.id){
                    allUsers.splice(i,1);
                    break;
                }
            }
        
            res.render('home',{title:"Socialization",userPost:post,userFriends : allUsers});
        } catch (error) {
            console.log("Error Found",error);
        }
    }
    else{
        res.render('home',{title:"Socialization"});
    }
}
