/**
 * Created by Ricardo Morais on 26/05/2017.
 */
let DDM_SERVICES = require("./ddm/ddmServices");
let CMS_SERVICES = require("./cms/cmsServices");
let namespaces = require("./namespaces")["namespaces"];
let debugGeneral = require("debug")("dispatcher");

const ddmURI = 'https://insticc.org/ddm';
const cmsURI = 'https://insticc.org/cms';


let stripNsPrefixRe = /^(?:{(?:[^}]*)})?(.*)$/;

/**
 * Handler of the dynamic domain model. It calls the proper
 * dispatcher to the action received.
 *
 * @param action Action name
 * @param args Arguments of the action
 * @param res Object to send back the http response
 */
let ddmHandler = function (action, args, res) {
    switch (action) {
        case DDM_SERVICES.actionsSupp.GET_DATA_VALUES:
            DDM_SERVICES.getDataValues(args, res);
            break;

        case DDM_SERVICES.actionsSupp.CHANGE_VISIBILITY:
            DDM_SERVICES.changeVisibility(args, res);
            break;

        case DDM_SERVICES.actionsSupp.CHANGE_VISUALIZATION:
            DDM_SERVICES.changeVisualization(args, res);
            break;

        case DDM_SERVICES.actionsSupp.ACTIONS:
            DDM_SERVICES.actions(res);
            break;

        case DDM_SERVICES.actionsSupp.CREATE_DEADLINE:
            DDM_SERVICES.createDeadline(args, res);
            break;

        case DDM_SERVICES.actionsSupp.READ_DEADLINE:
            DDM_SERVICES.readDeadline(args, res);
            break;

        case DDM_SERVICES.actionsSupp.UPDATE_DEADLINE:
            DDM_SERVICES.updateDeadline(args, res);
            break;

        case DDM_SERVICES.actionsSupp.DELETE_DEADLINE:
            DDM_SERVICES.deleteDeadline(args, res);
            break;

        default:
            res.status(404).send("Invalid service request");
    }
};

let cmsHandler = function (action, args, res) {
    switch (action) {
        case CMS_SERVICES.actionsSupp.SET_VISIBILITY:
            CMS_SERVICES.changeVisibility(args, res);
            break;

        case CMS_SERVICES.actionsSupp.SET_VIEW:
            CMS_SERVICES.changeView(args, res);
            break;
    }
};

let dispatch = function (namespace, action, args, res) {

    debugGeneral("DISPATCHING..");
    debugGeneral("Namespace", namespace);
    debugGeneral("Action", action);
    debugGeneral("Arguments", args);

    switch (namespace.toLowerCase()) {
        case ddmURI:
            ddmHandler(action, args, res);
            break;

        case cmsURI:
            cmsHandler(action, args, res);
            break;
    }
};

let getServices = function () {
    let services = {};
    services[ddmURI.toLowerCase()] = DDM_SERVICES.services;
    services[cmsURI.toLowerCase()] = CMS_SERVICES.services;
    return services;
};

let getNamespaces = function () {
    return [
        ddmURI.toLowerCase(),
        cmsURI.toLowerCase()
    ];
};


module.exports = {
    dispatch: dispatch,
    getServices: getServices,
    getNamespaces: getNamespaces
};