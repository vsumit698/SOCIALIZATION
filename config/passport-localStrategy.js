const passport  = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../models/userModel');
const postModel = require('../models/postModel');

passport.use(new LocalStrategy(// this is for authenticate the user with the database...
    {usernameField:'email',
    passwordField:'password',
    passReqToCallback:true },
    function(req,email,password,done){
        userModel.findOne({email:email},function(err,user){
            if(err){
                console.log("error in finding mail of user in DB",err);
                req.flash('error',err);
                done(err);
                return;
            }
            if(!user || user.password!=password){
                req.flash('error','Invalid Username/ Password');
                done(null,false);
                return;
            }
            done(null,user);
        });
    }    
));

// putting respective value of user key(below used _id key of user) in the session cookies
passport.serializeUser(function(user,done){ 
    done(null,user._id);
});

passport.deserializeUser(function(id,done){
    userModel.findById(id,function(err,user){
        if(err){
            console.log("error in finding mail of user in DB",err);
            done(err);
            return;
        }
        done(null,user);
    });
});

// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        res.render('user',{title:"Socilaization"});
    }else{
        res.render('signIn',{title:"Socilaization"});    // if the user is not signed in
    }
    next();
}



// if user is authenticated then providing user info to the user.ejs to display user profile
passport.setAuthenticator = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;

    }
    next();
};

module.exports = passport;