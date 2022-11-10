const catchAsync = require('./../utils/catchAsync');

exports.getAllQueues = catchAsync(async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 50;

  const totals = await req.app.locals.db.query(
    `SELECT count(*) as totals from queuerecord, dlr_status where queuerecord.recordState = dlr_status.id`
  );
  const queues = await req.app.locals.db.query(
    `SELECT * from queuerecord, dlr_status where queuerecord.recordState = dlr_status.id  order by queuerecord.id offset (${
      page - 1
    })*${limit} rows fetch next ${limit} rows only`
  );
  res.status(200).json({
    status: 'success',
    totals: totals.recordsets[0][0].totals,
    results: queues.recordsets[0].length,
    data: {
      queue: queues.recordsets[0],
    },
  });
});
