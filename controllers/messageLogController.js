const sql = require('mssql');
const catchAsync = require('./../utils/catchAsync');
const config = require('./../utils/configdb');

exports.getAllLogs = catchAsync(async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 50;

  const pool = await sql.connect(config);
  const logs = await pool
    .request()
    .query(
      `SELECT * from logrecord2, dlr_status where logrecord2.statusId = dlr_status.id order by logrecord2.id offset (${
        page - 1
      })*${limit} rows fetch next ${limit} rows only`
    );
  res.status(200).json({
    status: 'success',
    results: logs.recordsets[0].length,
    data: {
      logs: logs.recordsets[0],
    },
  });
});