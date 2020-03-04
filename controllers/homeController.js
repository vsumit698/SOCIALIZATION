module.exports.home = function(req,res,next){
    res.clearCookie("user_id");
    
    res.render('home',{title:"Social App"});
    next();
}
