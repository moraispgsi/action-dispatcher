/**
 * Created by Ricardo Morais on 26/05/2017.
 */


//                                  88
//                           ,d     ""
//                           88
// ,adPPYYba,   ,adPPYba,  MM88MMM  88   ,adPPYba,   8b,dPPYba,
// ""     `Y8  a8"     ""    88     88  a8"     "8a  88P'   `"8a
// ,adPPPPP88  8b            88     88  8b       d8  88       88
// 88,    ,88  "8a,   ,aa    88,    88  "8a,   ,a8"  88       88
// `"8bbdP"Y8   `"Ybbd8"'    "Y888  88   `"YbbdP"'   88       88
//
//
//
//          88  88                                                           88
//          88  ""                                        ,d                 88
//          88                                            88                 88
//  ,adPPYb,88  88  ,adPPYba,  8b,dPPYba,   ,adPPYYba,  MM88MMM   ,adPPYba,  88,dPPYba,    ,adPPYba,  8b,dPPYba,
// a8"    `Y88  88  I8[    ""  88P'    "8a  ""     `Y8    88     a8"     ""  88P'    "8a  a8P_____88  88P'   "Y8
// 8b       88  88   `"Y8ba,   88       d8  ,adPPPPP88    88     8b          88       88  8PP"""""""  88
// "8a,   ,d88  88  aa    ]8I  88b,   ,a8"  88,    ,88    88,    "8a,   ,aa  88       88  "8b,   ,aa  88
//  `"8bbdP"Y8  88  `"YbbdP"'  88`YbbdP"'   `"8bbdP"Y8    "Y888   `"Ybbd8"'  88       88   `"Ybbd8"'  88
//                             88
//                             88

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let dispatcher = require('./../libs/dispatcher/dispatcher')();
let debug = require("debug")("dispatcher");
app.use(bodyParser.json());                       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies
app.use(express.static('public'));

// initialize the oauth2
require('./oauth2.js')(app);

app.post('/execute', app.oauth.authorise(), function (req, res) {
    try {
        dispatcher.dispatch(req.body.namespace, req.body.action, req.body.arguments, res);
    } catch(err) {
        console.log(err.message);
        let status = err.status || 500;
        let message = "Failed to dispatch action!";
        res.status(status).json({
            status: status,
            message: message,
            error: err
        });
    }
});

app.get('/namespaces', app.oauth.authorise(), function (req, res) {
    try {
        let namespaces = dispatcher.getNamespaces();
        res.json({
            namespaces: namespaces
        });
    } catch (err) {
        console.log(err.message);
        let status = err.status || 500;
        let message = "Failed!";
        res.status(status).json({
            status: status,
            message: message,
            error: err
        });
    }
});

app.get('/services', app.oauth.authorise(), function (req, res) {
    try {
        let services = dispatcher.getServices();
        res.json(services);
    } catch (err) {
        console.log(err.message);
        let status = err.status || 500;
        let message = "Failed!";
        res.status(status).json({
            status: status,
            message: message,
            error: err
        });
    }
});

app.get('/subservices', app.oauth.authorise(), function (req, res) {
    try {
        let ns = req.query.namespace;
        let services = dispatcher.getServices();
        if(services[ns.toLowerCase()]){
            res.json(services[ns]);
        }
    } catch (err) {
        console.log(err.message);
        let status = err.status || 500;
        let message = "Could not find the namespace!";
        res.status(status).json({
            status: status,
            message: message,
            error: err
        });
    }
});

//Start the server
let server = app.listen(process.env.PORT || 8082, '0.0.0.0', function () {
    let host = server.address().address;
    let port = server.address().port;
    debug("listening at http://%s:%s", host, port);
});
