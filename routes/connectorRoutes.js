const express = require('express');
const connectorController = require('./../controllers/connectorController');

const router = express.Router();
router.route('/').get(connectorController.getAllConnectors);

module.exports = router;
