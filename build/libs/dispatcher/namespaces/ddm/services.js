'use strict';

// manifest
var namespace = 'http://www.insticc.org/ddm',
    abbreviation = 'ddm',
    url = process.env.DDM_SERVER;

var debug = require('debug')(abbreviation);
var utils = require("../../utils");

var services = {};

var router = {};

module.exports = {
    namespace: namespace,
    abbreviation: abbreviation,
    services: services,
    router: router
};