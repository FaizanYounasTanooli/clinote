#!/usr/bin/env node


import readline from 'readline-sync';
const newLineChar = "༚"
const allArgs = process.argv
const args = allArgs.slice(2)
let commandHistory=[];
import storage from "./storageProvider.js";

function countChar(str, find) {
    return (str.split(find)).length - 1;
}



function processCommand(cmdArray) {
    switch (cmdArray[0]) {
        case 'create':
            switch (cmdArray[1]) {
                case 'table':
                    let tableData={}
                    if (cmdArray.length-2===0)
                    {
                        const previousTableNumber=1;
                        tableData.name=`table-${previousTableNumber}`;
                    }
                    else if (args.length-2===1)
                    {

                    }
                    else
                    {
                        tableData.name= cmdArray[2];
                        tableData.headers= cmdArray.slice(3);
                    }
                    storage.addTable(tableData);

                    break;
            }
            break;
        case 'show':
            let entityName=cmdArray[2];
            switch (cmdArray[1]) {

                case 'table':

                    storage.showTableNote(entityName)
                    break;
                case 'note':
                    storage.showNote(entityName)
                    break;
                default:
                    break;
            }
            break;
        case 'table':
            let data={};
            data.name =cmdArray[1];
            data.data = cmdArray.slice(2);
            console.log(data.data);
            storage.appendToTableNote(data);
            break;
        case 'note':

            break;
        default:
            console.log("invalid command");
            break;

    }
}


if (args.length === 0) {
    var end = false
    while (!end) {
        let answer = readline.question('cliNote>>');
        if (countChar(answer, '\"') % 2 === 0) {
            end = true;
        } else {
            while (!(countChar(answer, '\"') % 2 === 0)) {
                answer = answer + newLineChar;
                answer = answer + readline.question('')
            }
        }
        let command = answer;
        let texts = []
        let matchNumber = 0;
        const re='(?<=\")(.*?)(?=\")';
        while (command.match(re)) {
            const matchedText = command.match(re);
            const text = {
                name: `text-${matchNumber}`,
                text: matchedText[0],
            }
            texts.push(text);
            command = command.replace(`"${text.text}"`, text.name)
            matchNumber++;
        }

        for (let i = 0; i < texts.length; i++) {
            texts[i].text = texts[i].text.replace(/༚/g, "\n");
        }
        let commandArray=command.split(/\s+/);
        for (let i=0; i<commandArray.length; i++)
        {
            let filtered=texts.filter(item=> item.name===commandArray[i])
            if  (filtered.length>0)
            {
                commandArray[i]=filtered[0].text;
            }
        }

        processCommand(commandArray);
        commandHistory.push(commandArray);
    }
} else {
    processCommand(args);
}