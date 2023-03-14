const mongoose= require('mongoose');

const Comment = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    comment:{
        type:String,
    },
    isDeleted:{
        type:Boolean,
        default:false,
    },
    deletedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:" user",
    },
    deletedAt:{
        type:Date,
    }
},{timestamps:true})    


const post = new mongoose.Schema (
    {
        title:{
            type:String,
            default:null
        },
        photo:{
            type:String,
            default:null
        },
        user:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'user',
            default: null
        },
        desc:{
            type:String,
            default:null
        },
        postComment:{
            type: [Comment], 
            default:null
        },
        createdAtDate:{
            type:Date,
            default:Date.now()
        },
        updatedAt:{
            type:Date,
            default:null
        },
        isDeleted:{
            type:Boolean,
            default:false
        },
        deletedAt:{
            type:Date,
            default: null
        },
        deletedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            default: null
        }
    }
)

module.exports = new mongoose.model('post',post);