'use strict';

/**
 * Created by Ricardo Morais on 10/07/2017.
 */

module.exports = function (app) {

    app.post('/execute', app.auth.authenticate(), function (req, res) {
        try {
            app.dispatcher.dispatch(req.body.namespace, req.body.action, req.body.arguments, res);
        } catch (err) {
            console.log(err.message);
            var status = err.status || 500;
            var message = "Failed to dispatch action!";
            res.status(status).json({
                status: status,
                message: message,
                error: err
            });
        }
    });

    app.get('/namespaces', app.auth.authenticate(), function (req, res) {
        try {
            var namespaces = app.dispatcher.getNamespaces();
            res.json({
                namespaces: namespaces
            });
        } catch (err) {
            console.log(err.message);
            var status = err.status || 500;
            var message = "Failed!";
            res.status(status).json({
                status: status,
                message: message,
                error: err
            });
        }
    });

    app.get('/services', app.auth.authenticate(), function (req, res) {
        try {
            var services = app.dispatcher.getServices();
            res.json(services);
        } catch (err) {
            console.log(err.message);
            var status = err.status || 500;
            var message = "Failed!";
            res.status(status).json({
                status: status,
                message: message,
                error: err
            });
        }
    });

    app.get('/subservices', app.auth.authenticate(), function (req, res) {
        try {
            var ns = req.query.namespace;
            var services = app.dispatcher.getServices();
            if (services[ns.toLowerCase()]) {
                res.json(services[ns]);
            } else {
                res.sendStatus(404);
            }
        } catch (err) {
            console.log(err.message);
            var status = err.status || 500;
            var message = "Could not find the namespace!";
            res.status(status).json({
                status: status,
                message: message,
                error: err
            });
        }
    });
};