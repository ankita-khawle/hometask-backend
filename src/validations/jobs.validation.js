const { Joi } = require('celebrate');

module.exports = {
    pay: {
        params: {
            job_id: Joi.number().required().messages({
                'number.base': `Job ID must be a number`,
                'any.required': `Job ID is required`,
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