let request = require("request");

let errorResponse = function(res, status, message) {
    res.status(status).send({
        status: status,
        error: message
    });
};

let redirect = function(expectedArgs, args, res, url) {
    for(let expected of expectedArgs) {
        if(!args.hasOwnProperty('expected')) {
            let errorMessage = 'Arguments received do not match the expected arguments, ' + expectedArgs.toString();
            errorResponse(res, 400, errorMessage);
        }
    }
    let options = {
        url,
        json: true,
        body: args
    };
    request.post(options, args, function (response, body) {
        if (body && body.status) {
            res.status(body.status).send(body);
        } else {
            let errorMessage = "The server did not provide a valid response.";
            let status = body ? body.status : 400;
            errorResponse(res, status, errorMessage);
        }
    });
};

module.exports = {
    errorResponse,
    redirect
};