'use strict';

/**
 * Created by Ricardo Morais on 26/05/2017.
 */

var fs = require('fs');
var path = require('path');
var debug = require("debug")("dispatcher");

var stripNsPrefixRe = /^(?:{(?:[^}]*)})?(.*)$/;

var namespacesMap = {};

var dir = path.join(__dirname, '/namespaces');

//Read the namespace folders and require their services
fs.readdirSync(dir).forEach(function (file) {
    var nsPath = path.join(dir, file);
    var ns = require(nsPath + '/services.js');
    debug('Loading ' + ns);
    namespacesMap[ns.namespace] = ns;
});

var dispatch = function dispatch(namespace, action, args, res) {
    var ns = namespacesMap[namespace];
    if (!ns) {
        res.status(404).send('Namespace ' + namespace + ' does not exists.');
        return;
    }
    if (!ns.router[action]) {
        res.status(404).send('The action ' + action + ' from the namespace ' + namespace + ' does not exists.');
        return;
    }
    ns.router[action](args, res);
};

var getServices = function getServices() {
    var services = {};
    var nsKeys = Object.keys(namespacesMap);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = nsKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var ns = _step.value;

            services[ns] = {
                abbreviation: namespacesMap[ns].abbreviation,
                actions: namespacesMap[ns].services
            };
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    console.log(services);
    return services;
};

var getNamespaces = function getNamespaces() {
    return Object.keys(namespacesMap);
};

module.exports = {
    dispatch: dispatch,
    getServices: getServices,
    getNamespaces: getNamespaces
};