
import http from 'http';
import debugInit from 'debug';
const debug = debugInit('boot.production');

module.exports = function (app) {
    app.db.sequelize.sync().done(() => {
        http.createServer(app)
            .listen(app.get('port'), () => {
                console.log(`action-dispatcher - Port ${app.get('port')}`);
            });
    });
};

