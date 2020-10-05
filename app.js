const debug = require('debug')('backend-apsit:app.js');
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
const csurf = require('csurf');

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
try {
    debug("Trial");
    let pool = (process.env.db_ca && process.env.db_key && process.env.db_cert)? mysql.createPool({
        host: process.env.db_host,
        user: process.env.db_user,
        password: process.env.db_password,
        database: process.env.db,
        ssl: {
            ca: process.env.db_ca,  
            key: process.env.db_key,
            cert: process.env.db_cert
        }
    }): mysql.createPool({
        host: process.env.db_host,
        user: process.env.db_user,
        password: process.env.db_password,
        database: process.env.db
    });
    pool = pool.promise();
    const sessionStore = new MySQLStore(session_options, pool);
    if (app.get('env') === 'production') {
        app.set('trust proxy', 1) // trust first proxy
        // sess.cookie.secure = true // serve secure cookies
    }
    // attach all the middleware
    app.use(compression());
    app.use(helmet());
    // app.use(csurf());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(session({
        name: "cookie_id",
        secret: process.env.sessionSecret,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {
            maxAge: ONE_DAY,
            sameSite: true,
            // secure: true,
            httpOnly: true
        },
    }));
    app.use((req, res, next) => {
        req.db = pool;
        next();
    });

    app.use('/', indexRouter);
    app.use('/users', usersRouter);


} catch (e) {
    debug(e);
}
module.exports = app;