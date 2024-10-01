const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin.controller');
const { celebrate: validate } = require('celebrate');
const validation = require('../validations/admin.validation');

router
    .route('/best-profession')
    /**
     * @api {get} api/admin/best-profession
     * @apiDescription Return profession that earns most money
     * @apiVersion 1.0.0  
     * @apiName fetchBestProfession
     * @apiGroup general
     * @apiPermission NA
     * @apiSuccess {Object} Status, message, data
     */
    .get(validate(validation.fetchBestProfession), controller.fetchBestProfession);

router
    .route('/best-clients')
    /**
     * @api {get}  api/admin/best-clients
     * @apiDescription  Return clients that paid the most for jobs 
     * @apiVersion 1.0.0
     * @apiName fetchBestClient
     * @apiGroup general
     * @apiPermission NA
     * @apiSuccess {Object} Status, message, data
     */
    .get(validate(validation.fetchBestClient), controller.fetchBestClient);

module.exports = router;
