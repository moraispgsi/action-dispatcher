/**
 * Created by Ricardo Morais on 10/07/2017.
 */

module.exports = app => {

    app.post('/execute', app.auth.authenticate(), function (req, res) {
        try {
            app.dispatcher.dispatch(req.body.namespace, req.body.action, req.body.arguments, res);
        } catch (err) {
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

    app.get('/namespaces', app.auth.authenticate(), function (req, res) {
        try {
            let namespaces = app.dispatcher.getNamespaces();
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

    app.get('/services', app.auth.authenticate(), function (req, res) {
        try {
            let services = app.dispatcher.getServices();
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

    app.get('/subservices', app.auth.authenticate(), function (req, res) {
        try {
            let ns = req.query.namespace;
            let services = app.dispatcher.getServices();
            if (services[ns.toLowerCase()]) {
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

};
