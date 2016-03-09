var express = require('express');
// to use a library in node we must require it. In most scenarios we don't have access to public methods (unlike Sinatra). We want to be more explicit about where we are getting our methods from
// lets use user our filesystem to look through views/paths
var path = require('path');
// simple library helps serve the favicon easy easy
var favicon = require('serve-favicon');
// LOGGER
// logger for us we use is called morgan.
var logger = require('morgan');
 // PARSING
// handles cookies and parameters. Unlike Rack which parses it nicely for us, with cookies and paramaeters. Here we have to be explicit about which library we want to use.
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/AwesomeAnswers");
// ROUTES
// routes here are the same as controllers, not rails `routes`. Here we are manually importing controllers.
var routes = require('./routes/index');
var users = require('./routes/users');
var questions = require("./routes/questions");
//Here is how we define the actual routes of what we are using.
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/questions', questions);
// this is where the express function() is invoked. It creates our app
// view engine setup
// this is telling express that our views are over here in this views file.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//**************** CONFIGURING LIBRARIES/parsers/static files/ MIDDLEWARE
// *****************************************************
// // catch 404 and forward to error handler
// middleware takes three parameters. reqquest/repsonse next res.end
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
//
// // error handlers
//
// // development error handler
// // will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
