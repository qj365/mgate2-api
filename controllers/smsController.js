const sql = require('mssql');
const catchAsync = require('./../utils/catchAsync');

exports.countReceivedSmsByDay = catchAsync(async (req, res, next) => {
  const count = await req.app.locals.db.query(
    `select count(*) as count from logrecord2 where (statusId = 9 or statusId = 5) and cast(sentTimestamp as date) = '${req.params.date}'`
  );
  res.status(200).json({
    status: 'success',
    data: {
      count: count.recordsets[0][0].count,
    },
  });
});

exports.countSentSmsByDay = catchAsync(async (req, res, next) => {
  const count = await req.app.locals.db.query(
    `select count(*) as count from logrecord2 where cast(creationTimestamp as date) = '${req.params.date}'`
  );
  res.status(200).json({
    status: 'success',
    data: {
      count: count.recordsets[0][0].count,
    },
  });
});

exports.groupSentSmsByGateway = catchAsync(async (req, res, next) => {
  const count = await req.app.locals.db.query(
    `select gatewayId,gatewayName,count(*) as count from logrecord2 where cast(sentTimestamp as date) = '${req.params.date}' group by gatewayId,gatewayName`
  );
  res.status(200).json({
    status: 'success',
    data: {
      gateways: count.recordsets[0],
    },
  });
});

exports.groupSentSmsByCampaign = catchAsync(async (req, res, next) => {
  const messageIds = await req.app.locals.db.query(
    `select entMessageId from logrecord2 where cast(sentTimestamp as date) = '${req.params.date}'`
  );

  const config = {
    user: 'e2e',
    password: 'mGate123!',
    server: 'localhost',
    database: 'prudential',
    options: {
      trustedconnection: true,
      enableArithAbort: true,
      instancename: 'SQLEXPRESS',
      trustServerCertificate: true,
    },
    port: 1433,
  };

  const prudentialPool = await sql.connect(config);

  const campaigns = await prudentialPool
    .request()
    .query(
      `select b.id,b.name,count(*) count from proxytable a, communicate b where b.id = a.frontend_campaign_code and a.id in (${messageIds.recordsets[0]
        .map((messageId) => messageId.entMessageId)
        .join(',')}) group by b.id,b.name`
    );

  res.status(200).json({
    status: 'success',
    data: {
      campaigns: campaigns.recordsets[0],
    },
  });
  prudentialPool.close();
});

exports.runningCampaign = catchAsync(async (req, res, next) => {
  const queuedSmsIds = await req.app.locals.db.query(
    `select entMessageId from queuerecord`
  );
  const config = {
    user: 'e2e',
    password: 'mGate123!',
    server: 'localhost',
    database: 'prudential',
    options: {
      trustedconnection: true,
      enableArithAbort: true,
      instancename: 'SQLEXPRESS',
      trustServerCertificate: true,
    },
    port: 1433,
  };

  const prudentialPool = await sql.connect(config);

  const campaigns = await prudentialPool
    .request()
    .query(
      `select b.id,b.name,count(*) count from proxytable a, communicate b where b.id = a.frontend_campaign_code and a.id in (${queuedSmsIds.recordsets[0]
        .map((messageId) => messageId.entMessageId)
        .join(',')}) group by b.id,b.name`
    );

  res.status(200).json({
    status: 'success',
    data: {
      campaigns: campaigns.recordsets[0],
    },
  });
  prudentialPool.close();
});
