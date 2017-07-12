
// manifest
let namespace = 'http://www.insticc.org/ddm',
    abbreviation = 'ddm',
    url = process.env.DDM_SERVER;

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
