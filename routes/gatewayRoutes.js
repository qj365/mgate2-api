const express = require('express');
const gatewayController = require('./../controllers/gatewayController');

const router = express.Router();
router.route('/').get(gatewayController.getAllGateways);

module.exports = router;
