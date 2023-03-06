const joi = require('joi')

const v = (Schema) => (payload) => Schema.validate(payload,{abortEarly:false});

const userschema = joi.object({
    fullname:joi.string().required(),
    email:joi.email().required(),
    username:joi.string().min(5).required(),
    password:joi.password().min(4).minOfSpecialCharacters(2).required()
})

const now = Date.now();
const cutoffDate = new Date(now - (1000 * 60 * 60 * 24 * 365 * 18));

const empschema = joi.object({
    name:joi.string().required(),
    email:joi.string().email().required(),
    phone:joi.string().min(10).max(10).required(),
    address:joi.string().max(150).required(),
    dob:joi.date().max(cutoffDate).required().required(),
    photo:joi.string(),
    department:joi.string().required()
})



exports.validateuser = v(userschema)
exports.validateemployee = v(empschema)
