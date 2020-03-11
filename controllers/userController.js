const userModel = require('../models/userModel');
const postModel = require('../models/postModel');
module.exports.deleteSession = function(req,res){
    req.logout();
    res.redirect('/user/sign-in');
}

module.exports.signUp = function(req,res,next){// Sign up Controller
    if(req.isAuthenticated()){
        res.redirect('/user');
        return;
    }
    res.render('signUp',{title:"Socialization"});
}

module.exports.signIn = function(req,res,next){//Sign In Controller
    res.render('signIn',{title:"Socialization"});
}

module.exports.user = function(req,res,next){ //Displaying user profile
    res.render('user',{title:"Socialization"});
}

module.exports.createUser = function(req,res,next){ // create user Controller

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

module.exports.createSession = function(req,res,next){ //create session Controller
    res.redirect('/'); // taking to the home of Socialization
}

module.exports.createPost = function(req,res){
    if(req.isAuthenticated()) postModel.create({content:req.body.content,user: req.user._id});
    res.redirect('back');
}
