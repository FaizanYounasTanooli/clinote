import fs from 'fs';
import csv from 'csvtojson';

var allArgs = process.argv
const packageAddress = allArgs[1].replace('\\index.js', '')
let folder = packageAddress + "\\notes\\";
import json2csv from "json2csv";

var newLine = '\r\n';

function writeFile(file, content) {

}

function addTableData(tableData) {
    let tableDataFile = tableData;
    let path = folder + tableDataFile;

    fs.appendFile(path, 'data to append', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

function addTable(data) {

    let allTablesFile = `${data.name}.csv`;
    let path = folder + allTablesFile;
    fs.stat(path, function (err, stat) {
        if (err == null) {
            console.log("table already exits");
        } else {
            let fields = data.headers + newLine;
            fs.writeFile(path, fields, function (err) {
                if (err) throw err;
                console.log('file saved');
            });
        }
    });

}

function appendToTableNote(data) {
    let tableDataFile = data.name;
    let path = folder + `${data.name}.csv`;
    if (fs.existsSync(path)) {
        fs.appendFile(path, data.data + newLine, function (err) {
            if (err) throw err;
            console.log('Note added');
        });
    } else {
        console.log()
    }
}

function showTableNote(name) {
    let path = folder + `${name}.csv`;
    csv()
        .fromFile(path)
        .then((jsonObj) => {
            console.table(jsonObj)
        });

}


function showNote(name) {
    let path = folder + `${name}.txt`;
    csv().fromFile(path).then((jsonObj) => {
        console.table(jsonObj)
    });
}

const storageProvider = {
    addTable,
    appendToTableNote,
    showTableNote,
    showNote,
}
export default storageProvider;