const fs = require('fs');
const mysql = require('mysql');
const myconfig = require('./myconfig.json');


var conPool = mysql.createPool({
    host: myconfig.host,
    user: myconfig.user,
    password: myconfig.password,
    database :'disha',
    connectionLimit: 15,
    queueLimit: 0 ,
    ssl : {
      ca: fs.readFileSync(myconfig.ssl.ca),
      key: fs.readFileSync(myconfig.ssl.key),
      cert: fs.readFileSync(myconfig.ssl.cert)
    }
  });
  
  module.exports = conPool;