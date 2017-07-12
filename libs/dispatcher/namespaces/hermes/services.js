
// manifest
let namespace = 'http://www.insticc.org/hermes',
    abbreviation = 'hermes',
    url = process.env.HERMES_SERVER;

let debug = require('debug')(abbreviation);
let utils = require("../../utils");

let services = {};

let router = {};

module.exports =  {
    namespace,
    abbreviation,
    services,
    router
};
