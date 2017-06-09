let request = require("request-promise");
let debug = require("debug")("ddm");

let RESTFUL = require("./../restful");
let namespaces = require("./../namespaces").namespaces;

let actionsSupported = {
    ACTIONS: "actions",
    GET_DATA_VALUES: "getDataValues",
    CHANGE_VISIBILITY: "changeVisibility",
    CHANGE_VISUALIZATION: "changeVisualization",
    CREATE_DEADLINE: "createDeadline",
    READ_DEADLINE: "readDeadline",
    UPDATE_DEADLINE: "updateDeadline",
    DELETE_DEADLINE: "deleteDeadline",
};


/**
 * Responsible to inform what are the supported actions of the Dynamic Domain Model Server
 * and its arguments, followed with a brief description.
 *
 * @param {Object} res Object to send back the http response
 */
function actions(res){
    let actionsSupported = [
        {
            name: "getDataValues",
            arguments: ["event", "data"],
            description: "This action will return all the data related to the ids and the event specified. " +
            "Arguments specification: The event must be a string composed of a event name plus event year. " +
            "Example: \"icSPORTS2017\"; The data must be an array of string ids of valid entities present in the ddm " +
            "system in order for the to server retrieve some proper data"
        },
        {
            name: "changeVisibility",
            arguments: ["id", "visibility"],
            description: "This action will make a request to a system " +
                         "to change the visibility of the entity specified. " +
                         "Arguments specification: The id must be a string and they must a valid one in the ddm system. " +
                         "The visibility should be a explicit boolean value and \"true\" -> entity will be visible and " +
                         "anything else -> entity will not be visible"
        },
        {
            name: "changeVisualization",
            arguments: ["id", "view"],
            description: "This action will make a request to a system " +
                         "to change the visualization of the entity specified. " +
                         "Arguments specification: The id must be a string and they must a valid one in the ddm system. " +
                         "The view should be a string with a valid view name that can be recognizable on the server that " +
                         "represents the entities."
        }
    ];
    debug("Action 'actions' executed with success");
    res.status(200).send(actionsSupported);
}

/**
 * Responsible to dispatch the action to retrieve data in the
 * dynamic domain model server.
 * After the dynamic domain model server responds the dispatch
 * server sends the http result to whom requested.
 *
 * @param {Object} arguments Arguments of the action
 * @param {Object} res Object to send back the http response
 */
function getDataValues(arguments, res) {
    let path = "/API/getDataValues";
    try {
        if (arguments.event && arguments.data) {
            RESTFUL.post(namespaces.DDM_SERVER + path, arguments, function (response, body) {
                if (body && body.status) {
                    res.status(body.status).send(body);
                } else {
                    let status = body ? body.status : 400;
                    let message = "DDM didn't provided a valid response!";
                    res.status(status).send({
                        status: status,
                        message: message
                    });
                }
            });
        } else {
            throw new Error("No valid arguments");
        }
    }catch(err){
        let status = 400;
        let message = "Request wasn't dispatched to DDM because there are arguments invalid";
        res.status(status).send({
            status: status,
            message: message,
            error: err.message
        });
    }
}

/**
 * Responsible to dispatch the action to change the visibility
 * of some entity.
 * After the dynamic domain model server responds the dispatch
 * server sends the http result to whom requested.
 *
 * @param {Object} arguments Arguments of the action
 * @param {Object} res Object to send back the http response
 */
function changeVisibility(arguments, res) {
    let path = "/API/changeVisibility";
    try {
        if (arguments.id && arguments.visibility) {
            RESTFUL.post(namespaces.DDM_SERVER + path, arguments, function (response, body) {
                if (body && body.status) {
                    res.status(body.status).send(body);
                } else {
                    let status = body ? body.status : 400;
                    let message = "DDM didn't provided a valid response!";
                    res.status(status).send({
                        status: status,
                        message: message
                    });
                }
            });
        } else {
            throw new Error("No valid arguments");
        }
    }catch(err){
        let status = 400;
        let message = "Request wasn't dispatched to DDM because there are arguments invalid";
        res.status(status).send({
            status: status,
            message: message,
            error: err.message
        });
    }
}

/**
 * Responsible to dispatch the action to change the visibility
 * of some entity.
 * After the dynamic domain model server responds the dispatch
 * server sends the http result to whom requested.
 *
 * @param {Object} arguments Arguments of the action
 * @param {Object} res Object to send back the http response
 */
function changeVisualization(arguments, res) {
    let path = "/API/changeVisualization";
    try {
        if (arguments.id && arguments.view) {
            RESTFUL.post(namespaces.DDM_SERVER + path, arguments, function (response, body) {
                if (body && body.status) {
                    res.status(body.status).send(body);
                } else {
                    let status = body ? body.status : 400;
                    let message = "DDM didn't provided a valid response!";
                    res.status(status).send({
                        status: status,
                        message: message
                    });
                }
            });
        } else {
            throw new Error("No valid arguments");
        }
    }catch(err){
        let status = 400;
        let message = "Request wasn't dispatched to DDM because there are arguments invalid";
        res.status(status).send({
            status: status,
            message: message,
            error: err.message
        });
    }
}


//TODO: To remove because it will be supported from webflow point of view
function createDeadline(arguments, res){
    let options = {
        method: "POST",
        uri: process.env.DDM_SERVER + "/API/simulation/deadline/create",
        body: arguments,
        json: true
    };
    debug("Action \"createDeadline\" is going to sent a request to: %s", options.uri);

    request(options).then(function(body){   // Post succeeded
        // no validation is performed on the body
        debug("Request received with success");
        res.status(200).send(body);

    }).catch(function(error){               // Post failed
        debug(error.message);
        res.status(500).send({error: error.message});
    });
}
function updateDeadline(arguments, res){
    let options = {
        method: "POST",
        uri: process.env.DDM_SERVER + "/API/simulation/deadline/update",
        body: arguments,
        json: true
    };
    debug("Action \"updateDeadline\" is going to sent a request to: %s", options.uri);

    request(options).then(function(body){   // Post succeeded
        // no validation is performed on the body
        debug("Request received with success");
        res.status(200).send(body);

    }).catch(function(error){               // Post failed
        debug(error.message);
        res.status(500).send({error: error.message});
    });
}
function readDeadline(arguments, res){
    let path = "/API/simulation/deadline/read";

    try {
        RESTFUL.post(namespaces.DDM_SERVER + path, arguments, function (response, body) {
            if (body && body.status) {
                res.status(200).send(body);
            } else {
                let status = body ? body.status : 400;
                let message = "DDM didn't provided a valid response!";
                res.status(400).send({
                    status: status,
                    message: message
                });
            }
        });
    }catch(err){
        let message = "Request wasn't dispatched to DDM because there are arguments invalid";
        res.status(400).send({
            status: status,
            message: message,
            error: err.message
        });
    }
}
function deleteDeadline(arguments, res){
    debug("Dispatch create deadline | arguments:", arguments);
    let path = "/API/simulation/deadline/delete";

    try {
        if (arguments && arguments.id) {
            RESTFUL.post(namespaces.DDM_SERVER + path, arguments, function (response, body) {
                if (body) {
                    res.status(200).send(body);
                } else {
                    let message = "DDM didn't provided a valid response!";
                    res.status(400).send({
                        message: message
                    });
                }
            });
        } else {
            throw new Error("No valid arguments");
        }
    }catch(err){
        let message = "Request wasn't dispatched to DDM because there are arguments invalid";
        res.status(400).send({
            message: message,
            error: err.message
        });
    }
}


/**
 * Exports all the supported interfaces to deal with actions
 * and its arguments.
 *
 * @param {Function} getDataValues
 * @param {Function} changeVisibility
 * @param {Function} changeVisualization
 * @param {Function} actions
 * @param {Object} actionsSupp
 */
module.exports = {
    getDataValues: getDataValues,
    changeVisibility: changeVisibility,
    changeVisualization: changeVisualization,
    actions: actions,
    createDeadline: createDeadline,
    updateDeadline: updateDeadline,
    readDeadline: readDeadline,
    deleteDeadline: deleteDeadline,

    actionsSupp: actionsSupported
};