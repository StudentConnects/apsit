const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql = require("mysql");
const helmet = require("helmet");
const compression = require("compression");
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const conPool = require('./dbconnection');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const registerRouter = require('./routes/register');
const app = express();

const {
    PORT = 8080,
    SESSION_LIFETIME = 1000 * 60 * 60 * 24,
    SESSION_SECRET = 'A6HD62NJ28YW92090JHWHW7W02HW27WY9268NDUW6988786GVD3F76AQ23Q',
    SESSION_NAME = 'session-id'
} = process.env;


app.use(compression());
app.use(helmet());
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



const session_options = {
    clearExpired: true,
    checkExpirationInterval: 900000,
    expiration: 86400000,
    createDatabaseTable: true,
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
const sessionStore = new MySQLStore(session_options, conPool);
app.use(session({
    name: SESSION_NAME,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: SESSION_LIFETIME,
        sameSite: true
        //1day TTL
        //by default its http only
    }
}));

const redirectLogin = (req, res, next) => {
    if (req.session.userId) {
        next();}
    else {
        res.redirect('/login.html')       
    }
};
const redirectStudent = (req, res, next) => {
    if (req.session.userId) {
        next();}
    else {
        res.redirect('/student_dashboard.html');       
    }
};
app.use('/',redirectLogin,indexRouter);
app.use('/register',redirectStudent,registerRouter);
app.use('/users',redirectLogin,usersRouter);

app.listen(PORT);

module.exports = app;
