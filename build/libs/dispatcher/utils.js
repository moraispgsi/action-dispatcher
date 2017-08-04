"use strict";

var request = require("request");

var errorResponse = function errorResponse(res, status, message) {
    res.status(status).send({
        status: status,
        error: message
    });
};

var redirect = function redirect(expectedArgs, args, res, url) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = expectedArgs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var expected = _step.value;

            if (!args.hasOwnProperty(expected)) {
                var errorMessage = 'Arguments received do not match the expected arguments, ' + expectedArgs.toString();
                errorResponse(res, 400, errorMessage);
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    request.post(url, { json: args }, function (error, response, body) {
        console.log(error);
        console.log(response);
        if (response && response.statusCode) {
            res.status(response.statusCode).send(body);
        } else {
            var errorMessage = "The server did not provide a valid response.";
            var status = 400;
            errorResponse(res, status, errorMessage);
        }
    });
};

module.exports = {
    errorResponse: errorResponse,
    redirect: redirect
};