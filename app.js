const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql = require('mysql2');
const helmet = require("helmet");
const compression = require("compression");
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');

// Required Routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// Variables Required
const app = express();
const ONE_DAY = 1000 * 60 * 60 * 24;
const hrs_2 = 7.2e+6;
const session_options = {
    checkExpirationInterval: hrs_2,
    createDatabaseTable: true,
    // charset: 'utf8mb4_bin',
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
};
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
const sessionStore = new MySQLStore(session_options, pool);

// attach all the middleware
app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    name: "cookie_id",
    secret: "2c68cc3448bf1254ea9b1c87dafe3054",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: ONE_DAY,
        sameSite: true
    }
}));
app.use((req, res, next) => {
    req.db = pool;
    next();
});

// const redirectLogin = (req, res, next) => {
//     if (req.session.userId) {
//         next();}
//     else {
//         res.redirect('/login.html')       
//     }
// };
// const redirectStudent = (req, res, next) => {
//     if (req.session.userId) {
//         next();}
//     else {
//         res.redirect('/student_dashboard.html');       
//     }
// };

// app.use((req, res, next) => {
//     req.db = pool;
//     next();
// });


app.use('/', indexRouter);
app.use('/users', usersRouter);


module.exports = app;