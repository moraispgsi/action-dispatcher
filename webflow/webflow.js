const Webflow = require("webflow-api");
const debug = require("debug")("webflow.js");

let idSite;
let websiteDomain;


const webflow = new Webflow({token: process.env.WEBFLOW_TOKEN});

function init(siteId, domain){
    debug("Init with values: siteId = %s | domain = %s", siteId, domain);
    idSite = siteId;
    websiteDomain = domain
}


function createItem(collectionName, itemObject){    // item as a object
    return co(function*(){
       const collections = yield webflow.collections({siteId: idSite});
       for(let collection of collections){
           if(collection.name === collectionName){
               debug("Found collection with name: %s", collectionName);
               let fields = generateFields(itemObject);
               const it = yield webflow.createItem({
                   collectionId: collection._id,
                   fields: fields
               });
               debug("Created item");
               return it; // promise returned
           }
       }
    });
}

function getItem(collectionName, itemId){
    return co(function*(){
        const collections = yield webflow.collections({siteId: idSite});
        for(let collection of collections){
            if(collection.name === collectionName){
                debug("Found collection with name: %s", collectionName);
                const item = yield webflow.item({collectionId: collection._id, itemId: itemId});
                return item;
            }
        }
    });
}

function updateItem(collectionName, itemObject){
    return co(function*(){
        const collections = yield webflow.collections({siteId: idSite});
        for(let collection of collections){
            if(collection.name === collectionName){
                debug("Found collection with name: %s", collectionName);
                const item = webflow.item({collectionId: collection._id, itemId: itemObject.id});
                webflow.updateItem({
                    collectionId: collection._id,
                    itemId: item._id,
                    fields: generateFields(itemObject)
                });
            }
        }
    });
}

function deleteItem(collectionName, itemId){
    return co(function*(){
        let collections = yield webflow.collections({siteId: idSite});
        for (let collection of collections) {
            if (collection.name === collectionName) {
                debug("Found collection with name: %s", collectionName);
                yield webflow.removeItem({collectionId: collection._id, itemId: itemId});
            }
        }
    });
}

function generateFields(itemObject){
    let obj = {
        _archived: itemObject.archived || false,
        _draft: itemObject.draft || false,
        slug: itemObject.id   // (id as default)	URL structure of the Item in your site. TODO: how to get the proper slug
    };
    for(let property in itemObject){
        obj[property] = itemObject[property];
    }
    return obj;
}


module.exports = {
    init: init,
    getItem: getItem,
    createItem: createItem,
    updateItem: updateItem,
    deleteItem: deleteItem,
};