let http = require('http');
let fs = require('fs');

module.exports = function (app) {
    http.createServer(app)
        .listen(app.get('port'), () => {
            console.log(`Listening on port ${app.get('port')}`);
        });
};

