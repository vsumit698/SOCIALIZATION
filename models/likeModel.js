const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'userModel',
        required : true
    },
    likedOn : {
        type : mongoose.Schema.Types.ObjectId,
        refPath : 'onModel',
        required : true
    },
    onModel :{
        type : String,
        enum : ['postModel','commentModel'],
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('likeModel',likeSchema);