const dotenv = require('dotenv');
const sql = require('mssql');
const config = require('./utils/configdb');

dotenv.config();
const appPool = new sql.ConnectionPool(config);
const app = require('./app');

appPool
  .connect()
  .then(function (pool) {
    app.locals.db = pool;
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`App running on port ${port}...`);
    });
  })
  .catch(function (err) {
    console.error('Error creating connection pool', err);
  });
