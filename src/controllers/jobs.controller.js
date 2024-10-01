const _ = require('lodash');
const { Op } = require('sequelize');
const APIError = require('../utils/APIError');

exports.fetchAllUnpaidJobs = async (req, res, next) => {
    try {
        const { Contract, Job, Profile } = req.app.get('models')

        let condition = {}
        if (req.profile.type === 'client') {
            condition = {
                ClientId: req.profile.id
            }
        } else if (req.profile.type === 'contractor') {
            condition = {
                ContractorId: req.profile.id
            }
        } else {
            throw new APIError({
                status: 404,
                message: `Invalid user type to fetch all unpaid jobs`,
            });
        }
        let data = await Job.findAll({
            raw: true,
            nest: true,
            where: {
                paid: {
                    [Op.is]: null
                }
            },
            include: [{
                model: Contract,
                attributes: [],
                where: condition
            }]

        })
        if (!data || !data.length) {
            throw new APIError({
                status: 404,
                message: `No unpaid jobs found`,
            });
        }

        return res.status(200).json({
            status: 200,
            message: `Unpaid jobs list fetched successfully`,
            data
        });

    } catch (err) {
        return res.json({
            status: err.status || 500,
            message: err.message || `Failed to fetch the unpaid jobs list`,
        });
    }
};


exports.pay = async (req, res, next) => {
    try {
        const { job_id } = req.params;
        const { amount } = req.body;

        const { Contract, Job, Profile } = req.app.get('models')

        let jobData = await Job.findOne({
            raw: true,
            nest: true,
            where: {
                id: job_id
            },
            include: [{
                model: Contract,
                include: [{
                    model: Profile,
                    as: 'Contractor'
                },
                {
                    model: Profile,
                    as: 'Client'
                }]
            }]
        })

        if (!jobData) {
            throw new APIError({
                status: 404,
                message: `No such job found`,
            });
        }

        if (jobData?.Contract?.Client?.balance < amount) {
            throw new APIError({
                status: 400,
                message: `Low balance to make the payment`,
            });
        }
        // sequelize transaction can be used here for more improvement
        let clientUpdate = await Profile.update(
            {
                balance: (jobData?.Contract?.Client?.balance - amount)
            },
            {
                where: {
                    id: jobData?.Contract?.Client?.id
                },

            },
        )
        if (clientUpdate[0]) { // if client update was successfull
            let contractorUpdate = await Profile.update(
                {
                    balance: jobData?.Contract?.Contractor?.balance + amount
                },
                {
                    where: {
                        id: jobData?.Contract?.Contractor?.id
                    }
                },
            )
            if (!contractorUpdate[0]) { // if contractor update was successfull
                throw new APIError({
                    status: 400,
                    message: `Balance not added to contractor`,
                });
            }
        } else {
            throw new APIError({
                status: 400,
                message: `Balance not deducted from client`,
            });
        }





        return res.status(200).json({
            status: 200,
            message: `Payment done successfully`,
        });

    } catch (err) {
        return res.json({
            status: err.status || 500,
            message: err.message || `Failed to make payment`,
        });
    }
};