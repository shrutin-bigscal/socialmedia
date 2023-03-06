const joi = require('joi')

const v = (Schema) => (payload) => Schema.validate(payload,{abortEarly:false});

const depatmentschema = joi.object({
    dname:joi.string().required()
})

const now = Date.now();
const cutoffDate = new Date(now - (1000 * 60 * 60 * 24 * 365 * 18));

const empschema = joi.object({
    name:joi.string().required(),
    email:joi.string().email().required(),
    phone:joi.string().min(10).max(10).required(),
    address:joi.string().max(150).required(),
    dob:joi.date().max(cutoffDate).required().required().error(
        (errors => {
            errors.forEach(err => {
              switch (err.code) {
                case "any.empty":
                  err.message = "Value should not be empty!";
                  break;
                case "string.max":
                  err.message = `your age mustbe 18 or more`;
                  break;
                default:
                  break;
              }
            });
            return errors;
        }),
    ),
    photo:joi.string(),
    department:joi.string().required()
})



exports.validatedepartment = v(depatmentschema)
exports.validateemployee = v(empschema)
