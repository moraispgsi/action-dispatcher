let fs = require('fs');

// npm run ns http://www.insticc.org/cms cms

let namespace = process.argv[2];
let abbr = process. argv[3];

if (!fs.existsSync('libs/dispatcher/namespaces/' + abbr)) {
    fs.mkdirSync('libs/dispatcher/namespaces/' + abbr);
    let template = fs.readFileSync("./namespaceTemplate.ejs", "utf8");

    let ejs = require('ejs'),
        servicesJS = ejs.render(template, {namespace, abbr});

    fs.writeFileSync('libs/dispatcher/namespaces/' + abbr + '/services.js', servicesJS);

} else {
    console.log('Folder already exists');
}


