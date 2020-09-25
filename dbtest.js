var fs = require('fs');
var mysql = require('mysql');
var myconfig = require('./myconfig.json');


function db_test() {
    var con = mysql.createConnection({
      host: myconfig.host,
      user: myconfig.user,
      password: myconfig.password,
      database :'disha',
      ssl : {
        ca: fs.readFileSync(myconfig.ssl.ca),
        key: fs.readFileSync(myconfig.ssl.key),
        cert: fs.readFileSync(myconfig.ssl.cert)
      }
    });
  
    con.connect(function(error) {
      if (error) {
        console.log("Error: Cannot connect to server: " + myconfig.host);
  
        if ("sqlMessage" in error) {
          console.log(error.errno + " : " + error.sqlMessage);
        } else {
          console.log(error);
        }
  
        return;
      }
  
      db_listDatabases(con);
    });
  }
  
  function db_listDatabases(con) {
    con.query('SHOW TABLES', function (error, results, fields) {
      if (error) {
        console.log("Error: Cannot query databases");
  
        if ("sqlMessage" in error) {
          console.log(error.errno + " : " + error.sqlMessage);
        } else {
          console.log(error);
        }
  
        con.end();
  
        return;
      }
      console.log(results);
      con.end();
    });
  }
  
  db_test();