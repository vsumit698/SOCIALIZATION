const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content : {type:String},
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'userModel'
    },
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'commentModel'
        }
    ]
},{timestamps:true});

const postModel = mongoose.model('postModel',postSchema);

module.exports = postModel;