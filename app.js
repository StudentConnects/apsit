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
// const csurf = require('csurf');
// const passport = require('passport');
// const passportLocal = require('passport-local').Strategy;

// Required Routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const { countReset } = require('console');

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
    } else {
const cors = require('cors');
app.use(cors());
    }
    // attach all the middleware
    app.use(compression());
    app.use(helmet());
    app.use(
        helmet.contentSecurityPolicy({
          directives: {
            defaultSrc: ["'self'", "'unsafe-inline'", "maxcdn.bootstrapcdn.com", "fonts.googleapis.com", "fonts.gstatic.com"],
            scriptSrc: ["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com", "cdn.jsdelivr.net"],
            "style-src-elem": ["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com", "maxcdn.bootstrapcdn.com", "cdn.jsdelivr.net", "fonts.googleapis.com"],
            "img-src": ["data:", "'self'"]
          },
        })
      );
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
            secure: true,
            httpOnly: true
        },
    }));
    app.use((req, res, next) => {
        req.db = pool;
        next();
    });

    
// Setting Passport for use
// passport.use(new passportLocal({
//     usernameField: 'email',
//     passwordField: 'password'
//   },
//     async function(username, password, _done) {
//         console.log("LINE 20");
//         console.log(username, password);
//         // if(username == "AdminAccount") {
//         //     if(password == "123456") {
//         //         console.log("Success verify");
//         //         return done(null, {"email": username, "password": password, name: "Test Admin"});
//         //     } else {
//         //         console.log("Wrong Password")
//         //         return done(null, false);
//         //     }
//         // } else if (username && password) {
//         //     console.log("Wrong username or password")
//         //     return done(null, false);
//         // } else {
//         //     console.log("No USERNAME and PASSWORD");
//         //     return done(new Error("NO Username or Password"));
//         // }
//     }
// ));

// passport.serializeUser(function(user, done) {
//     debug("LINE 41");
//     debug(user.email);
//     done(null, JSON.stringify({"email":user.email, "password": user.password}));
// });

// passport.deserializeUser(function(id, done) {
//     const {email: username, password} = JSON.parse(id);
//     console.log("LINE 48");
//     console.log(username, password);
//     if(username == "DishaUser") {
//         if(password == "123456") {
//             console.log("Success verify");
//             return done(null, {"email": username, "password": password, name: "Trial User"});
//         } else {
//             console.log("Wrong Password")
//             return done(null, false);
//         }
//     } else if (username && password) {
//         console.log("Wrong username or password")
//         return done(null, false);
//     } else {
//         console.log("No USERNAME and PASSWORD");
//         return done(new Error("NO Username or Password"));
//     }
// });

// router.use(passport.session());
// router.use(passport.initialize());


    app.use('/', indexRouter);
    app.use('/users', usersRouter);


} catch (e) {
    debug(e);
}
module.exports = app;