var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var expressSession = require('express-session');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var usersRouter = require('./routes/users');
var signup = require('./routes/signup');
var login = require('./routes/login');
var user = require('./routes/user');
var userjson = require('./routes/jsondata');
var downloadfile = require('./routes/downloadfile');
var logout = require('./routes/logout');
var changedetails = require('./routes/changedetails');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({secret:'max', saveUninitialized:false, resave: false}));

app.use('/', signup);
app.use('/', login);
app.use('/', user);
app.use('/account', userjson);
app.use('/account', downloadfile);
app.use('/account', changedetails);
app.use('/', logout);

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
