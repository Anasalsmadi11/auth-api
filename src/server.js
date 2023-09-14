'use strict';

// 3rd Party Resources
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./auth/routes.js');

const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');
const v1Routes = require('./routes/v1.js');
const v2Routes = require('./routes/v2.js');
app.use((req, res, next) => {
  // dont forget to add link of todo list
  const allowedOrigins = ['http://localhost:5173/', 'https://vvlvtj-5173.csb.app/' , 'https://3y65ff-5173.csb.app/' , 'https://deft-unicorn-5e4144.netlify.app/'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});
app.use(express.json());


app.use(logger);
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(authRoutes);

app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);

app.get("/",(req,res)=>{
  res.send(`welcome home`)
})

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
