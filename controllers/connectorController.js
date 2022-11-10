const catchAsync = require('./../utils/catchAsync');

exports.getAllConnectors = catchAsync(async (req, res, next) => {
  const connectors = await req.app.locals.db.query(
    "SELECT * from coreconfig where entryKey like 'connector%'"
  );
  res.status(200).json({
    status: 'success',
    results: connectors.recordsets[0].length,
    data: {
      connectors: connectors.recordsets[0],
    },
  });
});
