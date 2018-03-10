import express from 'express';
import promiseRouter from 'express-promise-router';
import methodOverride from 'method-override'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import compression from 'compression'
import Knex from 'knex';
import { Model } from 'objection';
import registerApi from './routes/api';

const router = promiseRouter();

const app = express()
  .use(methodOverride())
  .use(bodyParser.urlencoded({ extended: 'true' })) // parse application/x-www-form-urlencoded
  .use(bodyParser.json()) // parse application/json
  .use(morgan('dev'))
  .use(compression())
  .use(router)

registerApi(router);

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
  res.send('error');
});

module.exports = app;
