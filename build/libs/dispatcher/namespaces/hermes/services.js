'use strict';

// manifest
var namespace = 'http://www.insticc.org/hermes',
    abbreviation = 'hermes',
    url = process.env.HERMES_SERVER;

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