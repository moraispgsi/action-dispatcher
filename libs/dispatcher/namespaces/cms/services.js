
// manifest
let namespace = 'http://www.insticc.org/cms',
    abbreviation = 'cms',
    url = process.env.CMS_SERVER;

let debug = require('debug')(abbreviation);
let utils = require("../../utils");

let services = {
    changeVisibility: {
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
    changeView: {
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
    }
};


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
    utils.redirect(Object.keys(services.changeVisibility.arguments), args, res, url + path);
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
    utils.redirect(Object.keys(services.changeVisibility.arguments), args, res, url + path);
}

let router = {
    changeVisibility: changeVisibility,
    changeView: changeView,
};

module.exports = {
    namespace,
    abbreviation,
    services,
    router
};
