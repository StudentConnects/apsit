const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const csurf = require("csurf");
const mysql = require("mysql2");
const helmet = require("helmet");
const passport = require("passport");
const passport_local = require("passport-local");
const compression = require("compression");
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
// const { session } = require('passport');

const app = express();

app.use(compression());
app.use(helmet());
// app.use(csurf());
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// const pool = mysql.createPool({
//     host: process.env.db_host,
//     user: process.env.db_user,
//     password: process.env.db_password,
//     database: process.env.db_dbName,
//     waitForConnections: true,
// });

// const db = pool.promise();
// app.use((req, res, next) => {
//     req.db = db;
//     next();
// });
// passport.use(new passport_local(

// ))
// app.use(session({
//     secret: "APSIT-temp-SECRET",
//     name: "defaultID",

// }))

app.use(session({
    secret: 'A6HD62NJ28YW92090JHWHW7W02HW27WY9268NDUW6988786GVD3F76AQ23Q',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*60*24
        //1day TTL
    }
}));


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(8080);

module.exports = app;
