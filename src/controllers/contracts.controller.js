const _ = require('lodash');
const { Op } = require('sequelize');
const APIError = require('../utils/APIError');

exports.fetchAllContracts = async (req, res, next) => {
    try {
        const { Contract } = req.app.get('models')
        let condition = {
            status: {
                [Op.not]: 'terminated'
            }
        }
        if (req.profile.type === 'client') {
            condition['ClientId'] = req.profile.id
        } else if (req.profile.type === 'contractor') {
            condition['ContractorId'] = req.profile.id
        } else {
            throw new APIError({
                status: 404,
                message: `Invalid user type to fetch all contracts`,
            });
        }

        let data = await Contract.findAll({
            where: condition
        })
        if (!data || !data.length) {
            throw new APIError({
                status: 404,
                message: `No contract found`,
            });
        }

        return res.status(200).json({
            status: 200,
            message: `Contract list fetched successfully`,
            data
        });
    } catch (err) {
        return res.json({
            status: err.status || 500,
            message: err.message || `Failed to fetch the contracts list`,
        });
    }
};


exports.fetchContractsByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { Contract } = req.app.get('models')
        let condition = {
            id
        }
        if (req.profile.type === 'client') {
            condition['ClientId'] = req.profile.id
        } else if (req.profile.type === 'contractor') {
            condition['ContractorId'] = req.profile.id
        } else {
            throw new APIError({
                status: 404,
                message: `Invalid user type to fetch all contracts`,
            });
        }

        let data = await Contract.findAll({
            where: condition
        })

        if (!data || !data.length) {
            throw new APIError({
                status: 404,
                message: `No contract found for id ${id}`,
            });
        }

        return res.status(200).json({
            status: 200,
            message: `Contract data fetched successfully for ID - ${id}`,
            data
        });
    } catch (err) {
        return res.json({
            status: err.status || 500,
            message: err.message || `Failed to fetch the contracts for ID - ${id}`,
        });
    }
};
