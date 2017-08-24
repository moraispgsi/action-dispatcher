let express = require('express');
let consign = require('consign');

const app = express();

consign({ verbose: false })
  .include('libs/config.js')
  .then('libs/middlewares.js')
  .then('routes')
  .then('libs/boot.js')
  .into(app);

module.exports = app;
