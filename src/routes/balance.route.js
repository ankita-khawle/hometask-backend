const express = require('express');
const router = express.Router();
const controller = require('../controllers/balance.controller');
const { celebrate: validate } = require('celebrate');
const validation = require('../validations/balance.validation');

router
    .route('/deposit/:userId')
    /**
     * @api {get} api/balances/deposit/:userId
     * @apiDescription adds deposit per user
     * @apiVersion 1.0.0  
     * @apiName deposit
     * @apiGroup general
     * @apiPermission NA
     * @apiSuccess {Object} Status, message, data
     */
    .post(validate(validation.deposit), controller.deposit);
 
module.exports = router;