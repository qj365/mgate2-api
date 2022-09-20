const sql = require('mssql');
const catchAsync = require('./../utils/catchAsync');
const config = require('./../utils/configdb');

exports.getAllQueues = catchAsync(async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 50;

  const pool = await sql.connect(config);
  const totals = await pool
    .request()
    .query(
      `SELECT count(*) as totals from queuerecord, dlr_status where queuerecord.recordState = dlr_status.id`
    );
  const queues = await pool
    .request()
    .query(
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
