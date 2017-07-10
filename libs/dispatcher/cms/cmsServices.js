let request = require("request-promise");
let debug = require("debug")("cms");

let RESTFUL = require("../restful");
let namespaces = require("../namespaces").namespaces;

let services = [
    {
        name: "changeVisibility",
        arguments: {
            name: {
                type: 'string',
                description: 'The name of the website',
            },
            id: {
                type: 'string',
                description: 'The id of the component to change the visibility',
            },
            visibility: {
                type: 'boolean',
                description: 'The boolean value for the component visibility'
            }
        },
        description: "This action is used to change the visibility of a component in a website."
    },
    {
        name: "changeView",
        arguments: {
            name: {
                type: 'string',
                description: 'The name of the website',
            },
            id: {
                type: 'string',
                description: 'The id of the component to change the visibility',
            },
            view: {
                type: 'string',
                description: 'The view identifier'
            }
        },
        description: "This action is used to change the view of a component in a website."
    },
];

let actionsSupported = {
    ACTIONS: "actions",
    SET_VISIBILITY: "changeVisibility",
    SET_VIEW: "changeView",
};




/**
 * Responsible to inform what are the supported actions of the Dynamic Domain Model Server
 * and its args, followed with a brief description.
 *
 * @param {Object} res Object to send back the http response
 */
function actions(res) {
    let actionsSupported = services;
    debug("Action 'actions' executed with success");
    res.status(200).send(actionsSupported);
}

/**
 * Responsible to dispatch the action to retrieve data in the
 * dynamic domain model server.
 * After the dynamic domain model server responds the dispatch
 * server sends the http result to whom requested.
 *
 * @param {Object} args Arguments of the action
 * @param {Object} res Object to send back the http response
 */
function changeVisibility(args, res) {
    let path = "/API/setVisible";
    try {
        if (args.name && args.id) {
            RESTFUL.post(namespaces.CMS_SERVER + path, args, function (response, body) {
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
            throw new Error("No valid args");
        }
    } catch (err) {
        let status = 400;
        let message = "Request wasn't dispatched to CMS because there are args invalid";
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
 * @param {Object} args Arguments of the action
 * @param {Object} res Object to send back the http response
 */
function changeView(args, res) {
    let path = "/API/setView";
    try {
        if (args.id && args.name && args.view) {
            RESTFUL.post(namespaces.CMS_SERVER + path, args, function (response, body) {
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
        let message = "Request wasn't dispatched to the CMS because there are invalid arguments";
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
    actionsSupp: actionsSupported,
    services: services
};
