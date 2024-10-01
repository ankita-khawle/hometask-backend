
const { Joi } = require('celebrate');

module.exports = {
    deposit: {
        params: {
            userId: Joi.number().required().messages({
                'number.base': `User ID must be a number`,
                'any.required': `User ID is required`,
            }),
        },
        body: {
            amount: Joi.number().required().messages({
                'number.base': `Amount must be a number`,
                'any.required': `Amount is required`,
            }),
        },
    },
}

