let request = require("request-promise");
let debug = require("debug")("ddm");

let RESTFUL = require("../restful");
let namespaces = require("../namespaces").namespaces;

let services = [];

let actionsSupported = {
    ACTIONS: "actions"
};

/**
 * Responsible to inform what are the supported actions of the Dynamic Domain Model Server
 * and its arguments, followed with a brief description.
 *
 * @param {Object} res Object to send back the http response
 */
function actions(res){
    let actionsSupported = services;
    debug("Action 'actions' executed with success");
    res.status(200).send(actionsSupported);
}


/**
 * Exports all the supported interfaces to deal with actions
 * and its arguments.

 */
module.exports = {
    actions: actions,
    actionsSupp: actionsSupported,
    services: services
};