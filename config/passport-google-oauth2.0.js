const passport = require('passport');
const crypto = require('crypto');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const userModel = require('../models/userModel');

passport.use(new googleStrategy({
    clientID : '200626558260-g29c044k4ps1s4r6g4kadi3pno0i9be7.apps.googleusercontent.com',
    clientSecret : 'oiZTw3KB0Ey3NK8Sfmd1C1Ep',
    callbackURL : 'http://localhost:8000/user/auth/google/callback'
},function(accessToken,refreshToken,profile,done){

    const email = profile.emails[0].value;
    const name = profile.displayName;
    // console.log(profile.emails);
    // console.log(profile,'********');
    userModel.findOne({email : email},function(err,user){
        if(err){
            console.log('error in finding user  in google Auth');
            done(err,false);
            return;
        }
        if(user) {
            done(null,user);
            return;
        }
        userModel.create({email : email,name : name,password : crypto.randomBytes(20).toString('hex')}
        ,function(err,user){
            if(err){
                console.log('error in creating user in google Auth');
                done(err,false);
                return;
            }
            done(null,user);
        });
    });
    
}));

module.exports = passport;