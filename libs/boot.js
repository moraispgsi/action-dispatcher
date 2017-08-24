let bootProduction = require('./boot.production');
let bootDevelopment = require('./boot.development');
let bootTest = require('./boot.test');

let debugInit = require('debug');
const debug = debugInit('boot');


module.exports = app => {
  debug('Booting in %s mode.', process.env.NODE_ENV);
  process.on('uncaughtException', err => {
    console.log('Caught exception: ' + err);
  });
  switch (process.env.NODE_ENV) {
    case 'production':
      bootProduction(app);
      break;
    case 'development':
      bootDevelopment(app);
      break;
    case 'test':
      bootTest(app);
      break;
    default:
      bootDevelopment(app);
      break;
  }
};
