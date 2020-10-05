const dotenv = require("dotenv").config()

const {
    sendMultiple
} = require("@sendgrid/mail");
const mysql = require('mysql2');

let pool = mysql.createPool({
    multipleStatements: true,
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
pool = pool.promise();

(async () => {
    try {
        // let id, email, temp, isVerified;
        let reply = await pool.query("CALL Reg(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", ["omkar3654@gmail.com", "sjfbsdhfbsudhfbuhsdb", "omkaragrawal", 1234567890, "sfsdv", "Mumbai", "India", 401107, "sgdvsg", "hsdvghs"]);
        const data = reply[0][0][0];
        console.table([{id: data.id, email: data.email, status: data["@status"], isVerified: data.isVerified}]);
        // SELECT id, email , @status,  isVerified FROM user WHERE email = UEmail;  
        // SELECT @id:=(user.`id`),@UEmail1:=(user.`email`) , @status,  @isVerified:=(user.`isVerified`) FROM user WHERE email = UEmail;
        // console.log(data);
    } catch (err) {
        console.log(err);
    }
    await pool.end();
})()