const dotenv = require("dotenv").config()
const mysql = require('mysql2/promise');

// function db_test() {
//   var con = mysql.createConnection({
//     host: process.env.host,
//     user: process.env.user,
//     password: process.env.password,
//     database : process.env.db,
//     ssl : {
//       ca: process.env.db_ca,
//       key: process.env.db_key,
//       cert: process.env.db_cert,
//       rejectUnauthorized: false
//     }
//   });

//     con.connect(function(error) {
//       if (error) {
//         console.log("Error: Cannot connect to server: " + myconfig.host);

//         if ("sqlMessage" in error) {
//           console.log(error.errno + " : " + error.sqlMessage);
//         } else {
//           console.log(error);
//         }

//         return;
//       }

//       db_listDatabases(con);
//     });
//   }

//   function db_listDatabases(con) {
//     con.query('SELECT * FROM sessions', function (error, results, fields) {
//       if (error) {
//         console.log("Error: Cannot query databases");

//         if ("sqlMessage" in error) {
//           console.log(error.errno + " : " + error.sqlMessage);
//         } else {
//           console.log(error);
//         }

//         con.end();

//         return;
//       }
//       console.log(results);
//       con.end();
//     });
//   }

//   db_test();

(async () => {
   try{ 
const con = await mysql.createConnection({
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
  console.log(await con.query("show databases;"));
} catch(e) {
     console.log(e);
   }
})()

// console.log()