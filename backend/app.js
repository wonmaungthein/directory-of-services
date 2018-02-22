const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const morgan = require('morgan');
const knex = require('knex');
const knex2 = interopRequireDefault(knex);
const objection = require('objection');
const knexfile = require('./knexfile');

function interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const knexfile2 = interopRequireDefault(knexfile);

const router = require('./routes/api');

const app = express();

// Initialize knex.
const _knex = (0, knex2.default)(knexfile2.default.development);

// Bind all Models to a knex instance.
objection.Model.knex(_knex);

// Show requestes with morgan
app.use(morgan('combined'));

// static view
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
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
