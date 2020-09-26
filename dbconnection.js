const fs = require('fs');
const mysql = require('mysql');


var conPool = mysql.createPool({
      host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db,
  ssl: {
    ca: process.env.db_ca,
    key: process.env.db_key,
    cert: process.env.db_cert
  }
  });
  
  module.exports = conPool;