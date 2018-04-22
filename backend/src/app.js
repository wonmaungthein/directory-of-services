import express from 'express';
import promiseRouter from 'express-promise-router';
import methodOverride from 'method-override'
import bodyParser from 'body-parser'
import passport from 'passport';
import morgan from 'morgan'
import compression from 'compression'
import cors from 'cors';
import registerApi from './routes/api';
import users from './routes/users';

const router = promiseRouter();

const app = express()
  .use(methodOverride())
  .use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
  .use(bodyParser.json()) // parse application/json
  .use(morgan('dev'))
  .use(compression())
  .use(router)
  .use(passport.initialize())
  .use(passport.session())
  .use(cors());

registerApi(router);

app.use('/api', users);


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
