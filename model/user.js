const mongoose = require('mongoose');

const user = new mongoose.Schema(
    {
        fullname: {
            type: String,
            trim: true,
            require: true
        },
        username: {
            type: String,
            trim: true,
            require: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        // phone:{
        //     type:Number,
        //     required:true
        // },       
        password: {
            type: String,
            required: true
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        },
        createdAtDate: {
            type: Date,
            default: () => Date.now()
        },
        updatedAt: {
            type: Date
        },
        isDeleted: {
            type: Boolean
        },
        deletedAt: {
            type: Date,
            default:false
        },
        deletedBy: {
            type: Date
        },
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'role'
        }
    }
)

module.exports = new mongoose.model('user', user);