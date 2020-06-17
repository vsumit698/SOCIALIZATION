const userModel = require('../models/userModel');
const fs = require('fs');
const path = require('path');
const postModel = require('../models/postModel');
const commentModel = require('../models/commentModel');
const likeModel = require('../models/likeModel');

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
        req.flash('error','Password and Confirm Password are Same');
        res.redirect('back');
    }
    userModel.findOne({email:req.body.email},function(error,result){
        if(error){
            console.log("error in finding mail in database",error);
            return;
        }
        if(result){
            req.flash('error','Email Already Registered');
            console.log("Email already exists");
            res.redirect('back');
            return;
        }
        
        userModel.create(req.body);
        req.flash('success','Account Created Successfuly');
        res.redirect('/user/sign-in');
    });
}

module.exports.createSession = function(req,res,next){ //create session Controller
    // console.log("before Setting",req.flash('success'));
    req.flash("success","logged in successfuly");// setting msg for success key in flash msg.
    
    res.redirect('/'); // taking to the home of Socialization
   
}

module.exports.deleteSession = function(req,res){// log-out controler
    req.logout();
    req.flash("success","logged out !");
    res.redirect('/user/sign-in');
}

module.exports.friendProfile = function(req,res){
    userModel.findById(req.params.friendId,function(err,friend){
        if(err){
            console.log("error in finding friend in user Database",error);
            return;
        }
      
        res.render('userFriend',{title:"Socialization",friend : friend});
    });
}

module.exports.updateProfile = async function(req,res){
    if(req.isAuthenticated()){
        try {
            var user = await userModel.findById(req.user.id);

            userModel.uploadedAvatar(req,res,function(error){
                if(error){
                    console.log("error in updating AVATAR******");
                    return;
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    user.avatar = userModel.avatarPath +'/' + req.file.filename;
                    // console.log(req.file);
                }
                user.save();
            });
            
            // assigning  value to flash object (success)key out of callback function  
            req.flash('success','Updated Successfuly');
        } catch (error) {
            req.flash('error','Error in Updating Profile');
            console.log("Error Found",error);
        }
    }
    res.redirect('back');
}

module.exports.updateLike = async function(req,res){
    if(req.isAuthenticated()){
        try {
            let belongObj = await postModel.findById(req.body.id);
            if(belongObj){
                updateLike(belongObj,'postModel',req.user,res);
                return;
            }
            // checking in commentModel
            belongObj = await commentModel.findById(req.body.id);
            if(belongObj){
                // belong obj is comment
                updateLike(belongObj,'commentModel',req.user,res);
                return;
            }
            
        } catch (error) {
            // belong id does not exits in database
            res.json(200,{
                message : 'failure'
            });
        }
    }else{
        res.json(401,{
            message : 'banned'
        });
    }
}

async function updateLike(belongObject,onModel,loggedInUser,res){
    // belong object is post,comment
    let id = 0;
    for(let userId of belongObject.likes){
        if(userId == loggedInUser.id){
            // user already liked post so deleting this like
            belongObject.likes.splice(id,1);
            belongObject.save();

            var belongObjectLikes = await likeModel.find({likedOn : belongObject._id});
            for( let like of belongObjectLikes){
                if(like.user == loggedInUser.id){
                    like.remove();
                    res.json(200,{
                        message : 'like deleted'
                    });
                    return;
                }
            }
        }
        id++;
    }
    // user does not liked post creating like
    belongObject.likes.push(loggedInUser._id);
    belongObject.save();
    await likeModel.create({user : loggedInUser._id,likedOn : belongObject._id,onModel : onModel});
    res.json(200,{
        message : 'like added'
    });
}