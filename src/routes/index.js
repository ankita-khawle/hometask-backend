const express = require('express');
const router = express.Router();
const adminRoutes = require('./admin.route');
const balanceRoutes = require('./balance.route');
const contractsRoutes = require('./contracts.route');
const jobsRoutes = require('./jobs.route');

/**
 * GET /status
 */
// router.get('/status', (req, res) => {
//     return res.send('OK')
// }); //health-check api

// router.use('/api/admin', adminRoutes); // admin specific api routes
// router.use('/api/balance', balanceRoutes);  // balance specific api routes
router.use('/api/contracts', contractsRoutes); // contracts specific api routes
router.use('/api/jobs', jobsRoutes); // jobs specific api routes

module.exports = router;
