/**
 * Created by Ricardo Morais on 26/05/2017.
 */

let fs = require('fs');
let path = require('path');
let debug = require("debug")("dispatcher");

let stripNsPrefixRe = /^(?:{(?:[^}]*)})?(.*)$/;

let namespacesMap = {};

const dir = path.join(__dirname, '/namespaces');

//Read the namespace folders and require their services
fs.readdirSync(dir).forEach(file => {
    const nsPath = path.join(dir, file);
    const ns = require(nsPath + '/services.js');
    debug('Loading ' + ns);
    namespacesMap[ns.namespace] = ns;
});

let dispatch = function (namespace, action, args, res) {
    let ns = namespacesMap[namespace];
    if(!ns) {
        res.status(404).send('Namespace ' + namespace + ' does not exists.');
        return;
    }
    if(!ns.router[action]) {
        res.status(404).send('The action ' + action + ' from the namespace ' + namespace + ' does not exists.');
        return;
    }
    ns.router[action](args, res);
};

let getServices = function () {
    let services = {};
    let nsKeys = Object.keys(namespacesMap);
    for(let ns of nsKeys) {
        services[ns] = {
            abbreviation: namespacesMap[ns].abbreviation,
            actions: namespacesMap[ns].services
        }
    }
    console.log( services);
    return services;
};

let getNamespaces = function () {
    return Object.keys(namespacesMap);
};

module.exports = {
    dispatch: dispatch,
    getServices: getServices,
    getNamespaces: getNamespaces
};