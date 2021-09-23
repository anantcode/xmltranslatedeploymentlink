const fs = require("fs");
const convert = require("xml-js");

function readFiles(dirname, onFileContent, onError) {
    fs.readdir(dirname, function (err, filenames) {
        if (err) {
            onError(err);
            return;
        }
        filenames.forEach(function (filename) {
            fs.readFile(dirname + filename, "utf-8", function (err, content) {
                if (err) {
                    onError(err);
                    return;
                }
                onFileContent(filename, content);
                fs.writeFileSync("result1.json", JSON.stringify(table));
            });
        });
    });
}

function forEachXliffFile(filename, content) {
    console.log(filename);
    processContent(filename, content);
}

function handleError(err) {
    console.log(err);
}

let table = {};
let key = "";
let keyContains = "SCRIPTDEPLOYMENTLINK";
function processContent(filename, content) {
    let result;
    //if (filename !== "pt_BR.xlf") return;
    var result1 = convert.xml2json(content, { compact: true, spaces: 4 });
    //console.log(result1);
    //fs.writeFileSync("temp.txt", result1);
    let contentObj = JSON.parse(result1);
    let arr = contentObj.xliff.file.body["trans-unit"];
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        if (item.source._text === "E-Document Preferences") {
            console.log(i);
            console.log("Found E-Documents Preferencs index");
            if (item._attributes.id.indexOf(keyContains) > -1) {
                console.log(
                    i + " is real winner because it contains " + keyContains
                );
                result = item.target._text;
                console.log(item.target._text);
            }
        }
    }
    table[filename] = result;
}

readFiles("translated\\", forEachXliffFile, handleError);
