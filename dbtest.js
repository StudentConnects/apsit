const dotenv = require("dotenv").config()
// const mysql = require('mysql2/promise');
const mysql = require("mysql2");

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

// (async () => {
//    try{ 
// const con = await mysql.createConnection({
//   host: process.env.db_host,
//   user: process.env.db_user,
//   password: process.env.db_password,
//   database: process.env.db,
//   ssl: {
//     ca: process.env.db_ca,
//     key: process.env.db_key,
//     cert: process.env.db_cert
//   }
// });
//   console.log(await con.query("show databases;"));
// } catch(e) {
//      console.log(e);
//    }
// })()



// mysql.createConnection({
//   host: process.env.db_host,
//   user: process.env.db_user,
//   password: process.env.db_password,
//   database: process.env.db,
//   ssl: {
//     ca: process.env.db_ca,
//     key: process.env.db_key,
//     cert: process.env.db_cert
//   }
// }).then((connection) => {
//   connection.query("show databases;")
//     .then(results => {
//       // console.log(results[1][0]["_buf"].toString());
//       // console.log(results[0]);
//       console.log(results);
//       connection.end();
//       console.log("Closed the connection");
//     }).catch(error => console.log(error));
// }).catch(error => console.log(error));

(async () => {
  let pool = mysql.createPool({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db,
    ssl: {
      ca: process.env.db_ca,
      key: process.env.db_key,
      cert: process.env.db_cert
    }
  })
  pool = pool.promise();

  console.log("\n\nBEFORE TIMEOUT\n\n")
  setTimeout(async () => {
    let a = await pool.query("show databases;");
    let aa = await pool.query("show databases;");
    let aaa = await pool.query("show databases;");
    if(a && aa && aaa) {
      pool.query("SHOW TABLES;")
        .then((result) => {
          console.log(result);
          pool.end();
          console.log("Pool ended successfully");
        }).catch((err) => {
          console.log(err);
          pool.end();
          console.log("Pool ended wrongly");
        });
      console.log(a == aa == aaa);
    } else {
      console.log("NOT EQUAL");
    }
  }, 3000);
}
)()