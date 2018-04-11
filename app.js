// Require node modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
// // Parse Cookie header and populate req.cookies
// var cookieParser = require('cookie-parser');
// // Generates logs on any requests being made
// var logger = require('morgan');
// var formidable = require('formidable');  // for form handly but commented as doesn't work with enctype="multipart/form-data" 
var multer  = require('multer')
var fs = require('fs');
// bodyParser = require('body-parser')  // enables form submissions

// Require routers
var indexRouter = require('./routes/index');
// Require own modules
var run_python = require('./public/js/run_python')

var app = express();

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
// app.use(cookieParser());
app.use(express.json());  // parse application json
app.use(express.urlencoded({ extended: false }));  // parse application/x-www-form-urlencoded

// Set static folders
app.use(express.static(path.join(__dirname, 'public')));

// Set routers
app.use('/', indexRouter);

// -------------------------------------------------------------
// Upload route
var upload = multer({ dest: './public/data/uploads/' })
app.post('/stats', upload.single('uploaded_file'), function (req, res) {
  console.log('uploading file')
  // // var form = new formidable.IncomingForm();
  // // form.parse(req, function (err, fields, files) {
    var oldpath = req.file.path;
    var newpath = path.join(req.file.destination, req.file.originalname);
    // var newpath = path.join(__dirname, '/public/data/uploads/', files.uploaded_file.name);
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
    })
    run_python.run_python(__dirname, req.body.nspeakers).then(
      // Must wrap res.render inside function for promise to work
      function () {
        // console.log('After promise complete');
        res.render('stats', { title: 'AnalyzeMyMeeting.com' })
      }
    );
  // })
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
