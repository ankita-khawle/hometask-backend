const _ = require('lodash');
const { Op } = require('sequelize');
const APIError = require('../utils/APIError');

exports.fetchAllContracts = async (req, res, next) => {
    try {
        const { Contract } = req.app.get('models')
        let data = await Contract.findAll({
            raw: true,
            nest: true,
            where: {
                status: {
                    [Op.not]: 'terminated'
                },
            }
        });

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

        let data = await Contract.findAll({
            raw: true,
            nest: true,
            where: {
                ClientId: id
            },
        });
        if (!data || !data.length) {
            throw new APIError({
                status: 404,
                message: `No contract found for the profile id ${id}`,
            });
        }

        return res.status(200).json({
            status: 200,
            message: `Contract data fetched successfully for profile ID - ${id}`,
            data
        });
    } catch (err) {
        return res.json({
            status: err.status || 500,
            message: err.message || `Failed to fetch the contracts for ID - ${id}`,
        });
    }
};
