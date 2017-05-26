/**
 * Created by Ricardo Morais on 26/05/2017.
 */
let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.json());                       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies
app.use(express.static('public'));

app.post('/execute', function (req, res) {
    try {
        console.log(req.body);
        res.sendStatus(200);
    } catch(err) {
        res.json({error: err});
    }
});

//Start the server
let server = app.listen(2000, '0.0.0.0', function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("listening at http://%s:%s", host, port)
});
