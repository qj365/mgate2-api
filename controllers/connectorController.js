const sql = require('mssql');
const catchAsync = require('./../utils/catchAsync');
const config = require('./../utils/configdb');

exports.getAllConnectors = catchAsync(async (req, res, next) => {
  const pool = await sql.connect(config);
  const connectors = await pool
    .request()
    .query("SELECT * from coreconfig where entryKey like 'connector%'");
  res.status(200).json({
    status: 'success',
    results: connectors.recordsets[0].length,
    data: {
      connectors: connectors.recordsets[0],
    },
  });
});
