const postModel = require('../models/postModel')
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
            res.render('home',{title:"Socialization",userPost:post});
        });
    }
    else{
        res.render('home',{title:"Socialization"});
    }
}
