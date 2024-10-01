const _ = require('lodash');
const { Op } = require('sequelize');
const APIError = require('../utils/APIError');

exports.fetchBestProfession = async (req, res, next) => {
    try {
        const { Contract, Job, Profile } = req.app.get('models')
        const { start, end } = req.query;

        let clientList = await Profile.findAll({
            where: {
                type: 'client'
            },
            include: [{
                model: Contract,
                required: true,
                as: 'Client',
                include: [{
                    model: Job,
                    required: true,
                    where: {
                        paymentDate: {
                            [Op.between]: [start, end]
                        }
                    }
                }]
            }]
        });
        clientList = JSON.parse(JSON.stringify(clientList));

        if (!clientList || !clientList.length) {
            throw new APIError({
                status: 404,
                message: `No best profession found`,
            });
        }


        let bestProfession = 'nothing'
        let maxIncome = 0
        let jobMap = new Map()
        for (let element of clientList) {
            let buff = 0
            for (let client of element.Client) {
                for (let i of client.Jobs) {
                    buff = buff + i.price
                }
            }
            if (jobMap.has(element.profession)) {
                jobMap.set(element.profession, jobMap.get(element.profession) + buff)
            } else {
                jobMap.set(element.profession, buff)
            }
        }

        for (let [key, value] of jobMap) {
            if (value > maxIncome) {
                maxIncome = value
                bestProfession = key
            }
        }
        return res.status(200).json({
            status: 200,
            message: `Best profession is : ${bestProfession}`,
        });
    } catch (err) {
        return res.json({
            status: err.status || 500,
            message: err.message || `Failed to fetch the best profession `,
        });
    }
};


exports.fetchBestClient = async (req, res, next) => {
    try {
        const { Contract, Job, Profile } = req.app.get('models')
        const { start, end, limit = 2 } = req.query;

        let clientList = await Profile.findAll({
            where: {
                type: 'client'
            },
            include: [{
                model: Contract,
                as: 'Client',
                include: [{
                    model: Job,
                    required: true,
                    where: {
                        paid: true,
                        paymentDate: {
                            [Op.between]: [start, end]
                        }
                    }
                }]
            }],
        });
        clientList = JSON.parse(JSON.stringify(clientList));

        if (!clientList) {
            throw new APIError({
                status: 404,
                message: `No clients found`,
            });
        }

        let clientByIncome = []
        let clientMap = new Map()
        for (let element of clientList) {
            let buff = 0
            for (let client of element.Client) {
                for (let i of client.Jobs) {
                    buff = buff + i.price
                }
            }
            if (clientMap.has(element.id)) {
                clientMap.set(element.id, clientMap.get(element.id) + buff)
            } else {
                clientMap.set(element.id, buff)
            }
        }

        for (let [key, value] of clientMap) {
            let user = clientList.find(i => i.id === key)
            clientByIncome.push({
                "id": key,
                "fullName": user.firstName + ' ' + user.lastName,
                "paid": value
            })
        }
        if (clientByIncome.length) {
            clientByIncome.sort((a, b) => b.paid - a.paid)
            clientByIncome = clientByIncome.splice(0, Math.min(clientByIncome.length, limit))
            
        }
        return res.status(200).json({
            status: 200,
            message: `Client list by max payment generated successfully`,
            data: clientByIncome
        });
    } catch (err) {
        return res.json({
            status: err.status || 500,
            message: err.message || `Failed to fetch the best client `,
        });
    }
};
