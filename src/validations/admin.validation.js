
const { Joi } = require('celebrate');

module.exports = {
    fetchBestProfession: {
        query: {
            start: Joi.date().required().messages({
                'number.base': `Start date must be a date`,
                'any.required': `Start date is required`,
            }),
            end: Joi.date().required().messages({
                'number.base': `End date must be a date`,
                'any.required': `End date is required`,
            }),
        },
    },
    fetchBestClient: {
        query: {
            start: Joi.date().required().messages({
                'number.base': `Start date must be a date`,
                'any.required': `Start date is required`,
            }),
            end: Joi.date().required().messages({
                'number.base': `End date must be a date`,
                'any.required': `End date is required`,
            }),
            limit: Joi.number().required().messages({
                'number.base': `Limit must be a number`,
                'any.required': `Limit is required`,
            }),
        },
    },
}

