const app = require('express');
const smsController = require('./../controllers/smsController');

const router = app.Router();
router.route('/sent/:date').get(smsController.countSentSmsByDay);
router.route('/received/:date').get(smsController.countReceivedSmsByDay);
router.route('/gateway/:date').get(smsController.groupSentSmsByGateway);
router.route('/campaign/:date').get(smsController.groupSentSmsByCampaign);

module.exports = router;
