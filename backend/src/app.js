import express from 'express';
import methodOverride from 'method-override'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import compression from 'compression'
import router from './routes/api';

const app = express();
app.use(methodOverride())

app.use(bodyParser.urlencoded({ extended: 'true' }))            // parse application/x-www-form-urlencoded
app.use(bodyParser.json())                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })) // parse application/vnd.api+json as json

app.use(morgan('dev'))
app.use(compression())

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
  res.send('error');
});

module.exports = app;
