/**
 * Created by Ricardo Morais on 26/05/2017.
 */
module.exports = function(){
    let stripNsPrefixRe = /^(?:{(?:[^}]*)})?(.*)$/;

    let ddmHandler = function(action, arguments) {
        console.log("DDM ACTION REQUEST: ", action);
        console.log("DDM ACTION REQUEST DATA: ", arguments);
    };

    let dispatch = function(namespace, action, arguments) {
        switch(namespace.toLowerCase()){
            case "https://insticc.org/ddm":
                ddmHandler(action, arguments);
        }
    };

    return {
        dispatch: dispatch
    }

};