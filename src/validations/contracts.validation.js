
const { Joi } = require('celebrate');

module.exports = {
    fetchContractsByID: {
        params: {
            id: Joi.number().required().messages({
                'number.base': `User ID must be a number`,
                'any.required': `User ID is required`,
            }),
        },
    },
}
