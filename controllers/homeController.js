const postModel = require('../models/postModel')
module.exports.home = function(req,res){
    // res.clearCookie("user_id");
    if(req.isAuthenticated()){
        postModel.find({user:req.user._id},function(err,post){
            if(err) {
                console.log("error found in finding post",err);
                return;
            }
            res.render('home',{title:"Socialization",userPost:post});
        });
    }
    else{
        res.render('home',{title:"Socialization"});
    }
}
