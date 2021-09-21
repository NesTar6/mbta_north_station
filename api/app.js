import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cookie-parser'
import getSchedule from './routes/getSchedule';
import getPredictions from './routes/getPredictions';
import mergeData from './routes/mergeData';

const port = 8080
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded())
app.use(cookieParser());
app.use(cors())

app.use('/trainData', getSchedule, getPredictions, mergeData);

// catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

// error handler
  app.use(function(err, req, res, next) {

    // render the error page
    res.status(err.status || 500);
    res.send('error ', err.status, ':', err);
  });

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

export default app;
