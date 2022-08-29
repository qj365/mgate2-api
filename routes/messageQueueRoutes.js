const express = require('express');
const messageQueueController = require('./../controllers/messageQueueController');

const router = express.Router();
router.route('/').get(messageQueueController.getAllQueues);

module.exports = router;
