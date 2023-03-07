const mongoose= require('mongoose');

const role = new mongoose.Schema (
    {
        role:{
            type:String,
            default:'6406cdec9d0b2bbbade7d7f8',
            require:true,
        }
    }
)

module.exports = new mongoose.model('role',role);