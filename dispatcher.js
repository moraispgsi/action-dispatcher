/**
 * Created by Ricardo Morais on 26/05/2017.
 */
let DDM_SERVICES = require("./ddm/ddmServices");
let namespaces = require("./namespaces")["namespaces"];
let debug = require("debug")("ddm");


module.exports = function(){
    let stripNsPrefixRe = /^(?:{(?:[^}]*)})?(.*)$/;

    /**
     * Handler of the dynamic domain model. It calls the proper
     * dispatcher to the action received.
     *
     * @param action Action name
     * @param arguments Arguments of the action
     * @param res Object to send back the http response
     */
    let ddmHandler = function(action, arguments, res) {

        switch (action) {
            case "getDataValues":
                DDM_SERVICES.getDataValues(arguments, res);
                break;

            case "changeVisibility":
                DDM_SERVICES.changeVisibility(arguments, res);
                break;

            case "changeVisualization":
                DDM_SERVICES.changeVisualization(arguments, res);
                break;

            default:
                res.status(404).send("Invalid service request");
        }
    };

    let dispatch = function(namespace, action, arguments, res) {
        debug("DISPATCHING..");
        switch(namespace.toLowerCase()){
            case namespaces.DDM_SERVER.toLowerCase():
                ddmHandler(action, arguments, res);
        }
    };

    return {
        dispatch: dispatch
    }
};