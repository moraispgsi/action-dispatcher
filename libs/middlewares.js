import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import logger from './logger.js';
import dispatcher from './dispatcher/dispatcher.js';

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
  app.use(app.auth.initialize());
  app.use((req, res, next) => {
    delete req.body.id;
    next();
  });
  app.use(express.static('public'));
  app.dispatcher = dispatcher;
};
