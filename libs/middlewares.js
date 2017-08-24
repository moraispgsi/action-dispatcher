let bodyParser = require('body-parser');
let express = require('express');
let morgan = require('morgan');
let cors = require('cors');
let helmet = require('helmet');
let logger = require('./logger.js');
let dispatcher = require('./dispatcher/dispatcher');

module.exports = app => {
  app.set('port', process.env.PORT || 3002);
  app.set('json spaces', 4);
  app.use(morgan('common', {
    stream: {
      write: (message) => {
        logger.info(message);
      },
    },
  }));
  app.use(helmet());
  app.use(cors());
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    delete req.body.id;
    next();
  });
  app.use(express.static('public'));
  app.dispatcher = dispatcher;
};
