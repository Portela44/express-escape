require('dotenv').config();
require('./db');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// Auth requires:
// const session = require('express-session');
// const MongoStore = require('connect-mongo');

const indexRouter = require('./routes/index');
const userRouter = require("./routes/auth");
const enigmaRouter = require("./routes/enigma");


const app = express();

// // Setup proxy for deployment
// app.set('trust proxy', 1);
// // Cookie config
// app.use(
//   session({
//     name: 'misteryCookie',
//     secret: process.env.SESSION_SECRET,
//     resave: true,
//     saveUninitialized: false,
//     cookie: {
//       sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
//       secure: process.env.NODE_ENV === 'production',
//       httpOnly: true,
//       maxAge: 2592000000 // 30 days in milliseconds
//     },
//     store: MongoStore.create({
//       mongoUrl: process.env.MONGO_URL || 'mongodb://localhost/mistery-app'
//     })
//   })
// )

const session = require("express-session");
const MongoStore = require("connect-mongo");

app.set("trust proxy", 1);
app.use(
    session({
        name: "basic-auth",
        secret: process.env.SESSION_SECRET,
        resave:true,
        saveUninitialized:false,
        cookie:{
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            secure: process.env.NODE_ENV === "production",
            httpOnly:true,
            maxAge: 2592000000 //30 days,
        },
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URL || "mongodb://localhost/lab-express-basic-auth"
        })
    })
)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use("/auth", userRouter);
app.use("/enigma", enigmaRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
