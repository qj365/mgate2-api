const configdb = {
  user: 'apiuser',
  password: 'gemmob@2022',
  server: 'localhost',
  database: 'mGate2',
  options: {
    trustedconnection: true,
    enableArithAbort: true,
    instancename: 'SQLEXPRESS',
    trustServerCertificate: true,
  },
  port: 1433,
};

module.exports = configdb;
