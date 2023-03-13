const mongoose = require('mongoose');

const comment = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        },
        desc: {
            type: String,
            required: true
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
            type: Date
        },
        deletedBy: {
            type: Date,
            default:false
        },
    }
)

module.exports = new mongoose.model('comment', comment);