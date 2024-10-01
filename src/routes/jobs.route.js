const express = require('express');
const router = express.Router();
const controller = require('../controllers/jobs.controller');
const { celebrate: validate } = require('celebrate');
const validation = require('../validations/jobs.validation');

router
    .route('/unpaid')
    /**
     * @api {get} api/jobs/unpaid
     * @apiDescription Return all unpaid jobs
     * @apiVersion 1.0.0  
     * @apiName fetchAllUnpaidJobs
     * @apiGroup general
     * @apiPermission NA
     * @apiSuccess {Object} Status, message, data
     */
    .get(controller.fetchAllUnpaidJobs);

router
    .route('/:job_id/pay')
    /**
     * @api {get}  api/jobs/:job_id/pay
     * @apiDescription Pay for a job
     * @apiVersion 1.0.0
     * @apiName pay
     * @apiGroup general
     * @apiPermission NA
     * @apiSuccess {Object} Status, message, data
     */
    .post(validate(validation.pay), controller.pay);

module.exports = router;
