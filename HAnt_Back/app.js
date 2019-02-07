var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var indexRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var adminRouter = require('./routes/admin');
var rescuerRouter = require('./routes/rescuer');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), {index: 'login.html'}));

app.use('/', loginRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/users', usersRouter);

module.exports = app;
