let request = require("request");

let errorResponse = function(res, status, message) {
    res.status(status).send({
        status: status,
        error: message
    });
};

let redirect = function(expectedArgs, args, res, url) {
    for(let expected of expectedArgs) {
        if(!args.hasOwnProperty(expected)) {
            let errorMessage = 'Arguments received do not match the expected arguments, ' + expectedArgs.toString();
            errorResponse(res, 400, errorMessage);
        }
    }


    request.post(url, {json: args}, function (error, response, body) {
        console.log(error);
        console.log(response);
        if (response && response.statusCode) {
            res.status(response.statusCode).send(body);
        } else {
            let errorMessage = "The server did not provide a valid response.";
            let status = 400;
            errorResponse(res, status, errorMessage);
        }
    });
};

module.exports = {
    errorResponse,
    redirect
};