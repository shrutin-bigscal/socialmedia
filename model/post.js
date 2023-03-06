const mongoose= require('mongoose');

const post = new mongoose.Schema (
    {
        title:{
            type:String,
            required:true,
        },
        user:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'user'
        },
        desc:{
            type:String,
        },
        comment:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'comment'
        },
        createdAtDate:{
            type:Date,
            default: () => Date.now()
        },
        updatedAt:{
            type:Date
        },
        isDeleted:{
            type:Boolean
        },
        deletedAt:{
            type:Date
        },
        deletedBy:{
            type:Date
        }
    }
)

module.exports = new mongoose.model('post',post);