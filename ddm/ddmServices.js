let RESTFUL = require("./../restful");
let namespaces = require("./../namespaces").namespaces;


function isInt(value) {
    let x = parseFloat(value);
    return !isNaN(value) && (x | 0) === x;
}


/*****************************************
                SERVICES
 *****************************************/

/**
 * Responsible to dispatch the action to retrieve data in the
 * dynamic domain model server.
 * After the dynamic domain model server responds the dispatch
 * server sends the http result to whom requested.
 *
 * @param arguments Arguments of the action
 * @param res Object to send back the http response
 */
function getDataValues(arguments, res) {
    let path = "/getDataValues";
    if(arguments.event && arguments.data){
        RESTFUL.post(namespaces.DDM_SERVER + path, arguments, function(response, body){
            if(body && body.status){
                res.status(body.status).send(body);
            }else{
                let status = body.status || 400;
                let message = "DDM didn't provided a valid response!";
                res.status(status).send({
                    status: status,
                    message: message
                });
            }
        });
    }else{
        let status = 400;
        let message = "Request wasn't dispatched to DDM because there are arguments invalid";
        res.status(status).send({
            status: status,
            message: message
        });
    }
}

/**
 * Responsible to dispatch the action to change the visibility
 * of some entity.
 * After the dynamic domain model server responds the dispatch
 * server sends the http result to whom requested.
 *
 * @param arguments Arguments of the action
 * @param res Object to send back the http response
 */
function changeVisibility(arguments, res) {
    let path = "/changeVisibility";
    console.log("entrei");
    if(arguments.id && arguments.visibility) {
        RESTFUL.post(namespaces.DDM_SERVER + path, arguments, function(response, body){
            if(body && body.status){
                res.status(body.status).send(body);
            }else{
                res.status(body.status).send("DDM didn't provided a valid response!");
            }
        });
    }else{
        let status = 400;
        let message = "Request wasn't dispatched to DDM because there are arguments invalid";
        res.status(status).send({
            status: status,
            message: message
        });
    }
}

/**
 * Responsible to dispatch the action to change the visibility
 * of some entity.
 * After the dynamic domain model server responds the dispatch
 * server sends the http result to whom requested.
 *
 * @param arguments Arguments of the action
 * @param res Object to send back the http response
 */
function changeVisualization(arguments, res) {
    let path = "/changeVisualization";
    if(arguments.id && arguments.view) {
        RESTFUL.post(namespaces.DDM_SERVER + path, arguments, function (response, body){
            if(body && body.status){
                res.status(body.status).send(body);
            } else {
                res.status(body.status).send("DDM didn't provided a valid response!");
            }
        });
    }else{
        let status = 400;
        let message = "Request wasn't dispatched to DDM because there are arguments invalid";
        res.status(status).send({
            status: status,
            message: message
        });
    }
}


/**
 * Exports all the supported interfaces to deal with actions
 * and its arguments.
 *
 * @type {{getDataValues: getDataValues, changeVisibility: changeVisibility, changeVisualization: changeVisualization}}
 */
module.exports = {
    getDataValues: getDataValues,
    changeVisibility: changeVisibility,
    changeVisualization: changeVisualization,
};