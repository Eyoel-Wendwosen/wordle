const dictionary = require('../dictionary.json');
var fs = require('fs');


const words = {
    "5Letter": {},
    "6Letter": {},
    "7Letter": {}
}
function Utility() {
    for (let key in dictionary) {
        key = key.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\ ]/g, "");
        if (key) {
            if (key.length === 7) {
                words['7Letter'][key] = dictionary[key];
            }
            else if (key.length === 6) {
                words['6Letter'][key] = dictionary[key];
            }
            else if (key.length === 5) {
                words["5Letter"][key] = dictionary[key];
            }
        }
    }
}
Utility();


// words['5Letter'].sort((a, b) => Object.keys(a)[0].localeCompare(Object.keys(b)[0]));
// words['6Letter'].sort((a, b) => Object.keys(a)[0].localeCompare(Object.keys(b)[0]));
// words['7Letter'].sort((a, b) => Object.keys(a)[0].localeCompare(Object.keys(b)[0]));

fs.writeFile("./words-def.json", JSON.stringify(words), function (err) {
    if (err) {
        console.log(err);
    }
});

