const express = require('express');
const cors = require('cors');

const messageLogRouter = require('./routes/messageLogRoutes');
const messageQueueRouter = require('./routes/messageQueueRoutes');
const connectorRouter = require('./routes/connectorRoutes');
const gatewayRouter = require('./routes/gatewayRoutes');
const smsRouter = require('./routes/smsRoutes');

const app = express();

//Cors
app.use(cors());

//Body parser
app.use(express.json({ limit: '10kb' }));

app.use('/api/log', messageLogRouter);
app.use('/api/queue', messageQueueRouter);
app.use('/api/connector', connectorRouter);
app.use('/api/gateway', gatewayRouter);
app.use('/api/sms', smsRouter);

module.exports = app;
