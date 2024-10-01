const express = require('express');
const router = express.Router();
const controller = require('../controllers/contracts.controller');
const { celebrate: validate } = require('celebrate');
// const { authorize, verifyAuthRoles } = require('../../middlewares/auth');
const validation = require('../validations/contracts.validation');

router
    .route('/')
    /**
     * @api {get} api/contracts
     * @apiDescription Return all contracts per user ID
     * @apiVersion 1.0.0
     * @apiName fetchContracts
     * @apiGroup general
     * @apiPermission NA
     * @apiSuccess {Object} Status, message, data
     */
    .get(controller.fetchAllContracts);

router
    .route('/:id')
    /**
     * @api {get} api/contracts/:id
     * @apiDescription Return contracts per user ID
     * @apiVersion 1.0.0
     * @apiName fetchContractsByID
     * @apiGroup general
     * @apiPermission NA
     * @apiSuccess {Object} Status, message, data
     */
    .get(validate(validation.fetchContractsByID), controller.fetchContractsByID);

module.exports = router;
