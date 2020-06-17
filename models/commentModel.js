const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content :{
        type: String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'userModel'
    },
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'postModel'
    },
    likes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'userModel'
        }
    ]
},{timestamps:true});

const commentModel = mongoose.model('commentModel',commentSchema);
module.exports = commentModel;
