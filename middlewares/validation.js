import Joi from "joi";

const userJoi = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
        ,

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        name: Joi.string()
        .min(3)
        .max(30)
        .required(),
       

})
export default userJoi