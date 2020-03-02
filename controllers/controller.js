module.exports.home = function(req,res,next){
    res.render('root',{title:"Social App"});
    next();
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