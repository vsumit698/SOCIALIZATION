const userModel = require('../models/userModel');



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
    req.flash("success","logged in successfuly");
    
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

module.exports.updateProfile = function(req,res){
    if(req.isAuthenticated()){
        userModel.findByIdAndUpdate(req.user.id,req.body,function(err,updatedUser){
            if(err) {
                console.log("error in updating user in database",err);
                req.flash('error','Updation Failed');
                return;
            }
            
        });
        // assigning  value to flash object (success)key out of callback function  
        req.flash('success','Updated Successfuly');
    }
    res.redirect('/user');
}