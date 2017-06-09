const webflow = require("./webflow");
const co = require("co");
const debug = require("debug")("webflow-services");


const token = process.env.WEBFLOW_TOKEN;
/*/
const idSite = "593660103cae1a495ac1952f";
const domain = "iceis.webflow.io";
*/
let actionsSupported = {
    INIT: "init",
    CREATE_ITEM: "createItem",
    UPDATE_ITEM: "updateItem",
    DELETE_ITEM: "deleteItem",
    GET_ITEM: "getItem"
};

//TODO Define the responses

function init (arguments, res){
    let siteId = arguments.siteId;
    let domain = arguments.domain;
    debug("Data received on init with: site id: %s | domain: ", siteId, domain);

    co(function*(){
        webflow.init(siteId, domain);
        debug("Success on init some metadata webflow");
        res.status(200).send("...");

    }).then().catch(function(error){
        debug("Failed to init some metadata of webflow");
        debug("msg: %s | code: %d | name: %s | path: %s", error.msg, error.code, error.name, error.path);
        res.status(500).send({error: error.err});
    });
}

function createItem (arguments, res){
    let collectionName = arguments.collectionName;
    let properties = arguments.properties;
    debug("Data received on create with: collection name: %s | properties: ", collectionName, properties);

    co(function*(){
        let item = yield webflow.createItem(collectionName, properties)
        debug("Success on creating the item on weblow");
        res.status(200).send("...");

    }).then().catch(function(error){
        debug("Failed to create item on webflow");
        debug("msg: %s | code: %d | name: %s | path: %s", error.msg, error.code, error.name, error.path);
        res.status(500).send({error: error.err});
    });
}

function updateItem (arguments, res){
    let collectionName = arguments.collectionName;
    let properties = arguments.properties;
    debug("Data received on update with: collection name: %s | properties: ", collectionName, properties);

    co(function*(){
        let item = yield webflow.updateItem(collectionName, properties)
        debug("Success on updating the item on weblow");
        res.status(200).send("...");

    }).then().catch(function(error){
        debug("Failed to update item on webflow");
        debug("msg: %s | code: %d | name: %s | path: %s", error.msg, error.code, error.name, error.path);
        res.status(500).send({error: error.err});
    });
}

function deleteItem (arguments, res){
    let collectionName = arguments.collectionName;
    let id = arguments.id;
    debug("Data received on deleting with: collection name: %s | id: ", collectionName, id);

    co(function*(){
        let item = yield webflow.deleteItem(collectionName, id)
        debug("Success on deleting the item on weblow");
        res.status(200).send("...");

    }).then().catch(function(error){
        debug("Failed to delete an item on webflow");
        debug("msg: %s | code: %d | name: %s | path: %s", error.msg, error.code, error.name, error.path);
        res.status(500).send({error: error.err});
    });
}

function getItem (arguments, res){
    let collectionName = arguments.collectionName;
    let id = arguments.id;
    debug("Data received on get with: collection name: %s | id: ", collectionName, id);

    co(function*(){
        let item = yield webflow.getItem(collectionName, id)
        debug("Success on get the item on weblow");
        res.status(200).send("...");

    }).then().catch(function(error){
        debug("Failed to get the item on webflow");
        debug("msg: %s | code: %d | name: %s | path: %s", error.msg, error.code, error.name, error.path);
        res.status(500).send({error: error.err});
    });
}


module.exports = {
    createItem: createItem,
    updateItem: updateItem,
    deleteItem: deleteItem,
    getItem: getItem,
    init: init,
    actionsSupp : actionsSupported
};