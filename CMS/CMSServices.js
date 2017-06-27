let request = require("request-promise");
let debug = require("debug")("ddm");

let RESTFUL = require("./../restful");
let namespaces = require("./../namespaces").namespaces;

let actionsSupported = {
    SET_VISIBILITY: "changeVisibility",
    SET_VIEW: "changeView",
};


/**
 * Responsible to inform what are the supported actions of the Dynamic Domain Model Server
 * and its arguments, followed with a brief description.
 *
 * @param {Object} res Object to send back the http response
 */
function actions(res) {
    let actionsSupported = [
        {
            name: "changeVisibility",
            arguments: ["name", "id", "visibility"],
            description: "This action receives the name of the website, the id of the component and changes it to" +
            " true/false(visible/ not visible) based on the value of visibility"
        },
        {
            name: "changeView",
            arguments: ["name", "id", "view"],
            description: "This action receives the name of the website, the id of the component and changes it to" +
            " the received view"
        },
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
function changeVisibility(arguments, res) {
    let path = "/API/setVisible";
    try {
        if (arguments.name && arguments.id) {
            RESTFUL.post(namespaces.CMS_SERVER + path, arguments, function (response, body) {
                if (body && body.status) {
                    res.status(body.status).send(body);
                } else {
                    let status = body ? body.status : 400;
                    let message = "CMS didn't provided a valid response!";
                    res.status(status).send({
                        status: status,
                        message: message
                    });
                }
            });
        } else {
            throw new Error("No valid arguments");
        }
    } catch (err) {
        let status = 400;
        let message = "Request wasn't dispatched to CMS because there are arguments invalid";
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
function changeView(arguments, res) {
    let path = "/API/setView";
    try {
        if (arguments.id && arguments.name && arguments.view) {
            RESTFUL.post(namespaces.CMS_SERVER + path, arguments, function (response, body) {
                if (body && body.status) {
                    res.status(body.status).send(body);
                } else {
                    let status = body ? body.status : 400;
                    let message = "CMS didn't provided a valid response!";
                    res.status(status).send({
                        status: status,
                        message: message
                    });
                }
            });
        } else {
            throw new Error("No valid arguments");
        }
    } catch (err) {
        let status = 400;
        let message = "Request wasn't dispatched to CMS because there are arguments invalid";
        res.status(status).send({
            status: status,
            message: message,
            error: err.message
        });
    }
}

module.exports = {
    changeView: changeView,
    changeVisibility: changeVisibility,
    actions: actions,
    actionsSupp: actionsSupported
};
