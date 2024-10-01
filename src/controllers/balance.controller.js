const _ = require('lodash');
const { Op } = require('sequelize');
const APIError = require('../utils/APIError');

exports.deposit = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { amount } = req.body;

        const { Contract, Job, Profile } = req.app.get('models')

        let clientData = await Profile.findOne({
            raw: true,
            nest: true,
            where: {
                id: userId,
                type: 'client'
            },

        })
        if (!clientData) {
            throw new APIError({
                status: 404,
                message: `No client found`,
            });
        }

        let jobData = await Job.findAll({
            raw: true,
            nest: true,
            include: [{
                model: Contract,
                attributes: [],
                where: {
                    ClientId: clientData.id
                },
            }]
        })
        if (!jobData) {
            throw new APIError({
                status: 404,
                message: `No job found`,
            });
        }
        let total = 0
        jobData.map(item=> {
            total = total + item.price
        })
        let percentageAmt = total * (25 / 100)
        if(amount > percentageAmt) {
            throw new APIError({
                status: 400,
                message: `Amount cannot be more than 25% of total jobs to pay.`,
            });
        }

        // sequelize transaction can be used here for more improvement
        let clientUpdate = await Profile.update(
            {
                balance: clientData.balance + amount
            },
            {
                where: {
                    id: clientData.id
                },

            },
        )
        if (!clientUpdate[0]) { // if client update was successfull
            throw new APIError({
                status: 400,
                message: `Balance not deposited to client`,
            });
        }

        return res.status(200).json({
            status: 200,
            message: `Deposited money successfully`,
        });

    } catch (err) {
        return res.json({
            status: err.status || 500,
            message: err.message || `Failed to make deposit`,
        });
    }
};