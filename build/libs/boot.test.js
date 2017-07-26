'use strict';

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app) {
  var credentials = {
    key: _fs2.default.readFileSync('ntask.key', 'utf8'),
    cert: _fs2.default.readFileSync('ntask.cert', 'utf8')
  };
  app.db.sequelize.sync({ force: true }).done(function () {
    _https2.default.createServer(credentials, app).listen(app.get('port'), function () {
      // The server needs to be operational in order to bind the port within 90 seconds
      // Therefore since the engine init is an expensive operation,
      // we initialize the server first.

    });
  });
};