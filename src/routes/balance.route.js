const express = require('express');
const router = express.Router();
const controller = require('../controllers/balance.controller');
const { celebrate: validate } = require('celebrate');
// const { authorize, verifyAuthRoles } = require('../../middlewares/auth');
const validation = require('../validations/balance.validation');

// router
//   .route('/user/kyc/status/all')
//   /**
//    * @api {get} api/v1/agent/user/kyc/status
//    * @apiDescription List of customer with their pre kyc status for agent
//    * @apiVersion 1.0.0
//    * @apiName Fetch customer prekyc status
//    * @apiGroup Admin
//    * @apiPermission Admin
//    * @apiSuccess {Object} Status, message
//    */
//   .get(controller.getCustomerListForAgent);

  module.exports = router;
