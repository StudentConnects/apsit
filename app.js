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
app.use(csurf());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const pool = mysql.createPool({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_dbName,
    waitForConnections: true,
});

const db = pool.promise();
app.use((req, res, next) => {
    req.db = db;
    next();
})
// passport.use(new passport_local(

// ))
app.use(session({
    
}))
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
