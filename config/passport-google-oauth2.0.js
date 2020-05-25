const passport = require('passport');
const crypto = require('crypto');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const userModel = require('../models/userModel');

passport.use(new googleStrategy({
    clientID : '************',
    clientSecret : '***********',
    callbackURL : '*****************'
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