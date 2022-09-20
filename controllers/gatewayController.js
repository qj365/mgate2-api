const sql = require('mssql');
const catchAsync = require('./../utils/catchAsync');
const config = require('./../utils/configdb');

exports.getAllGateways = catchAsync(async (req, res, next) => {
  const pool = await sql.connect(config);
  const gateways = await pool
    .request()
    .query("SELECT * from coreconfig where entryKey like 'gateway%'");
  res.status(200).json({
    status: 'success',
    results: gateways.recordsets[0].length,
    data: {
      gateways: gateways.recordsets[0],
    },
  });
});
