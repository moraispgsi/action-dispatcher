
module.exports = function(app) {

    const OAuth2Server = require('oauth2-server');

    app.oauth = OAuth2Server({
        model: require('./model.js'),
            grants: ['password', 'client_credentials'],
        debug: true
    });

    app.all('/oauth/token', app.oauth.grant());

    app.use(app.oauth.errorHandler());

};