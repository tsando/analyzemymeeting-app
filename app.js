var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// for file upload
var formidable = require('formidable');
var fs = require('fs');

var indexRouter = require('./routes/index');

// Own modules
var stats = require('./public/js/stats')

var app = express();

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Body Parser Middleware
app.use(logger('dev'));
// parse application json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// -------------------------------------------------------------
// Upload route
app.post('/stats', function (req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    // `file` is the name of the <input> field of type `file`
    var oldpath = files.file.path;
    var newpath = path.join(__dirname, '/public/data/uploads/', files.file.name);
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
    })
    stats.run_python(__dirname).then(
      // Must wrap res.render inside function for promise to work
      function () {
        // console.log('After promise complete');
        res.render('stats', { title: 'AnalyzeMyMeeting' })
      }
    );
  })
});

// -------------------------------------------------------------

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
