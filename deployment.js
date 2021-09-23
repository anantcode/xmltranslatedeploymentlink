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
            });
        });
    });
}

function forEachXliffFile(filename, content) {
    console.log(filename);
    processContent(content);
}

function handleError(err) {
    console.log(err);
}

function processContent(content) {
    var result1 = convert.xml2json(content, { compact: true, spaces: 4 });
    console.log(result1);
}

readFiles("translated\\", forEachXliffFile, handleError);
