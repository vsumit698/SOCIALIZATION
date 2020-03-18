const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const userModel = require('../models/userModel');

var opts = {
    jwtFromRequest : extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'socialization'
};
passport.use(new jwtStrategy(opts,function(JWTpayload,done){

    userModel.findById(JWTpayload._id,function(error,user){
        if(error){
            console.log("error found while finding user at JWT",error);
        }
        if(user){
            return done(null,user);
        }
        return done(null,false);
    });

}));

module.exports = passport;