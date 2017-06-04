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
let dispatcher = require('./dispatcher')();

app.use(bodyParser.json());                       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies
app.use(express.static('public'));

app.post('/execute', function (req, res) {
    try {
        dispatcher.dispatch(req.body.namespace, req.body.action, req.body.arguments, res);
    } catch(err) {
        let status = err.status || 500;
        let message = "Failed to dispatch action!";
        res.status(status).json({
            status: status,
            message: message,
            error: err
        });
    }
});


//Start the server
let server = app.listen(process.env.PORT || 8080, '0.0.0.0', function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("listening at http://%s:%s", host, port)
});
