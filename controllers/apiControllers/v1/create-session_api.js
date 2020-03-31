const userModel = require('../../../models/userModel');
const jsonwebtoken = require('jsonwebtoken');// this creates jwt token initially which will used every time to authenticate user with database



module.exports.createApiSession = async function(req,res){
    try {
        var user = await userModel.findOne({email : req.body.email});
    
        if(!user || user.password != req.body.password){
            return res.json(200,{
                message : "Invalid Username Or Password"
            })
        }
        return res.status(200).json({
            message : "successfully authenticated by JWT",
            token : jsonwebtoken.sign(user.toJSON(),'socialization',{expiresIn:'100000'})
        });
    } catch (error) {
        console.log("Error Found : ",error);
        res.json(200,{
            message : "Error in finding user at Server Side"
        });
    }
};