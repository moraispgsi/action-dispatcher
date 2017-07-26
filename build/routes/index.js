'use strict';

module.exports = function (app) {
  /**
   * @api {get} / API Status
   * @apiGroup Status
   * @apiSuccess {String} status API Status' message
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   *    {"status": "action-dispatcher  API"}
   */
  app.get('/', function (req, res) {
    res.json({ status: 'action-dispatcher API' });
  });
};