module.exports.home = function(req,res,next){
    res.render('home',{title:"Social App"});
    next();
}
module.exports.signUp = function(req,res,next){
    res.render('signUp',{title:"Social App"});
}
module.exports.signIn = function(req,res,next){
    res.render('signIn',{title:"Social App"});
}

module.exports.createUser = function(req,res,next){
    res.send('user created');
}

module.exports.createSession = function(req,res,next){
    res.send('user successfuly logged in');
}

module.exports.user = function(req,res,next){
    res.render('user',{title:"Social App"});
    next();
}
module.exports.post = function(req,res,next){
    res.send("page rendered via post controller :) ");
    next();
}
module.exports.like = function(req,res,next){
    res.send("page rendered via like controller :) ");
    next();
}