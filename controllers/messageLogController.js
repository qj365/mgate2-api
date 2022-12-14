const catchAsync = require('./../utils/catchAsync');

exports.getAllLogs = catchAsync(async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 50;

  const totals = await req.app.locals.db.query(
    `SELECT count(*) as totals from logrecord2, dlr_status where logrecord2.statusId = dlr_status.id`
  );
  const logs = await req.app.locals.db.query(
    `SELECT * from logrecord2, dlr_status where logrecord2.statusId = dlr_status.id order by logrecord2.id offset (${
      page - 1
    })*${limit} rows fetch next ${limit} rows only`
  );
  res.status(200).json({
    status: 'success',
    totals: totals.recordsets[0][0].totals,
    results: logs.recordsets[0].length,
    data: {
      logs: logs.recordsets[0],
    },
  });
});
