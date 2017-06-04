let request = require("request");

/**
 * Simple interface to do a http POST request.
 *
 * @param path Path of the resource
 * @param data Data to send in JSON format
 * @param callback Function to be executed after the request is successful
 */
exports.post = function(path, data, callback){
    let options = {
        url: path,
        json: true,
        body: data
    };
    request.post(options, function (err, response, body){
        if(callback &&  typeof callback == "function"){
            console.log(err);
            callback(response, body);
        }else{
            throw new Error("Callback is required to handle response");
        }
    });
};