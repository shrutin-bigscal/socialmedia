const mongoose= require('mongoose');



const comment = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    comment:{
        type:String
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    deletedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:" user"
    },
    deletedAt:{
        type:Date,
        default:false
    }
},{timestamps:true})


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
            type: [comment], 
            default:null
        },
        photo:{
            type:String,
        },
        createdAtDate:{
            type:Date,
            default: () => Date.now()
        },
        updatedAt:{
            type:Date,
            default: null
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
            type: mongoose.Types.ObjectId,
            ref: 'user',
            default: null
        }
    }
)

module.exports = new mongoose.model('post',post);