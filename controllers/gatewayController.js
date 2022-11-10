const catchAsync = require('./../utils/catchAsync');

exports.getAllGateways = catchAsync(async (req, res, next) => {
  const gateways = await req.app.locals.db.query(
    "SELECT * from coreconfig where entryKey like 'gateway%'"
  );
  res.status(200).json({
    status: 'success',
    results: gateways.recordsets[0].length,
    data: {
      gateways: gateways.recordsets[0],
    },
  });
});
