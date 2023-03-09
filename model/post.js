const mongoose= require('mongoose');

const post = new mongoose.Schema (
    {
        title:{
            type:String,
            trim:true,
            required:true,
        },
        user:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'user'
        },
        desc:{
            type:String,
            trim:true,
        },
        comment:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'comment'
        },
        photo:{
            type:String,
        },
        createdAtDate:{
            type:Date,
            default: () => Date.now()
        },
        updatedAt:{
            type:Date
        },
        isDeleted:{
            type:Boolean,
            default:false
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