const express = require('express');
const messageLogController = require('./../controllers/messageLogController');

const router = express.Router();
router.route('/').get(messageLogController.getAllLogs);

module.exports = router;
