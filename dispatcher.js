/**
 * Created by Ricardo Morais on 26/05/2017.
 */
let DDM_SERVICES = require("./ddm/ddmServices");
let CMS_SERVICES = require("./cms/cmsServices");
let namespaces = require("./namespaces")["namespaces"];
let debugGeneral = require("debug")("dispatcher");

const ddmURI = 'https://insticc.org/ddm';
const cmsURI = 'https://insticc.org/cms';

module.exports = function () {
    let stripNsPrefixRe = /^(?:{(?:[^}]*)})?(.*)$/;

    /**
     * Handler of the dynamic domain model. It calls the proper
     * dispatcher to the action received.
     *
     * @param action Action name
     * @param arguments Arguments of the action
     * @param res Object to send back the http response
     */
    let ddmHandler = function (action, arguments, res) {
        switch (action) {
            case DDM_SERVICES.actionsSupp.GET_DATA_VALUES:
                DDM_SERVICES.getDataValues(arguments, res);
                break;

            case DDM_SERVICES.actionsSupp.CHANGE_VISIBILITY:
                DDM_SERVICES.changeVisibility(arguments, res);
                break;

            case DDM_SERVICES.actionsSupp.CHANGE_VISUALIZATION:
                DDM_SERVICES.changeVisualization(arguments, res);
                break;

            case DDM_SERVICES.actionsSupp.ACTIONS:
                DDM_SERVICES.actions(res);
                break;

            case DDM_SERVICES.actionsSupp.CREATE_DEADLINE:
                DDM_SERVICES.createDeadline(arguments, res);
                break;

            case DDM_SERVICES.actionsSupp.READ_DEADLINE:
                DDM_SERVICES.readDeadline(arguments, res);
                break;

            case DDM_SERVICES.actionsSupp.UPDATE_DEADLINE:
                DDM_SERVICES.updateDeadline(arguments, res);
                break;

            case DDM_SERVICES.actionsSupp.DELETE_DEADLINE:
                DDM_SERVICES.deleteDeadline(arguments, res);
                break;

            default:
                res.status(404).send("Invalid service request");
        }
    };

    let cmsHandler = function (action, arguments, res) {
        switch (action) {
            case CMS_SERVICES.actionsSupp.SET_VISIBILITY:
                CMS_SERVICES.changeVisibility(arguments, res);
                break;

            case CMS_SERVICES.actionsSupp.SET_VIEW:
                CMS_SERVICES.changeView(arguments, res);
                break;
        }
    };

    let dispatch = function (namespace, action, arguments, res) {
        debugGeneral("DISPATCHING..");
        debugGeneral("Namespace", namespace);
        debugGeneral("Action", action);
        debugGeneral("Arguments", arguments);
        switch (namespace.toLowerCase()) {
            case ddmURI:
                ddmHandler(action, arguments, res);
                break;

            case cmsURI:
                cmsHandler(action, arguments, res);
                break;
        }
    };

    let getServices = function () {
        let services = {};
        services[ddmURI.toLowerCase()] = DDM_SERVICES.services;
        services[cmsURI.toLowerCase()] = CMS_SERVICES.services;
        return services;
    };

    return {
        dispatch: dispatch,
        getServices: getServices
    }
};
