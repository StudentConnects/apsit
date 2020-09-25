const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const csurf = require("csurf");
const mysql = require("mysql");
const helmet = require("helmet");
const passport = require("passport");
const passport_local = require("passport-local");
const compression = require("compression");
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const conPool = require('./dbconnection');
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

var options = {
    clearExpired: true,
    // How frequently expired sessions will be cleared; milliseconds:
    checkExpirationInterval: 900000,
    // The maximum age of a valid session; milliseconds:
    expiration: 86400000,
    // Whether or not to create the sessions database table, if one does not already exist:
    createDatabaseTable: true,
    // Number of connections when creating a connection pool:
    charset: 'utf8mb4_bin',
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
};
const sessionStore = new MySQLStore(options,conPool);
app.use(session({
    secret: 'A6HD62NJ28YW92090JHWHW7W02HW27WY9268NDUW6988786GVD3F76AQ23Q',
    resave: false,
    saveUninitialized: true,
    store : sessionStore,
    cookie: {
        maxAge: 1000*60*60*24
        //1day TTL
    }
}));


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(8080);

module.exports = app;
