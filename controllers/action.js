module.exports.home = function(req,res,next){
    res.send("page rendered via home controller :) ");
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