const userModel = require('../models/userModel');
module.exports.signUp = function(req,res,next){
    res.render('signUp',{title:"Social App"});
}
module.exports.signIn = function(req,res,next){
    res.render('signIn',{title:"Social App"});
}
module.exports.user = function(req,res,next){
    res.render('user',{title:"Social App"});
    next();
}

module.exports.createUser = function(req,res,next){

    if(req.body.password != req.body.confirmPassword){
        res.redirect('back');
    }
    userModel.findOne({email:req.body.email},function(error,result){
        if(error){
            console.log("error in finding mail in database",error);
            return;
        }
        if(result){
            console.log("Email already exists");
            res.redirect('back');
            return;
        }
        
        userModel.create(req.body);
        res.redirect('/user/sign-in');
    });
}

module.exports.createSession = function(req,res,next){
    res.send('user successfuly logged in');
}

