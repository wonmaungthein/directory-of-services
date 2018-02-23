const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const { Model } = require('objection');
const knexfile = require('./knexfile');
const router = require('./routes/api');

const app = express();

// Initialize knex.
const knexConfig = (knexfile.development);

// Bind all Models to a knex instance.
Model.knex(knexConfig);

// Show requestes with morgan
app.use(morgan('combined'));

// static view
app.use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json());

app.use('/api', router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
