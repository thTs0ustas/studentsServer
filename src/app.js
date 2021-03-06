'use strict';
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
var cors = require('cors');
// our ears - get the requests
const studentsRouter = require('./routes/studentsRoute.js');
const coursesRouter = require('./routes/courseRouter.js');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/students', studentsRouter);
app.use('/courses', coursesRouter);
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
