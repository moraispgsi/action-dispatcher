let request = require("request");

/**
 *
 * @param path
 * @param data
 * @param callback
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