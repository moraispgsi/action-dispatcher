'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)('boot.production');

module.exports = function (app) {
    app.db.sequelize.sync().done(function () {
        _http2.default.createServer(app).listen(app.get('port'), function () {
            console.log('action-dispatcher - Port ' + app.get('port'));
        });
    });
};