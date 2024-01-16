import chalk from 'chalk';
import fs from 'fs';

import getExtracedFile from './index.js';

const args = process.argv;

function printList(list, path = ''){
    console.log(
        chalk.black.bgYellow(`Lita de links:`), 
        chalk.black.bgGreen(path),
        list);
}

async function textProcess(args) {
    const path = args[2];

    try {
        fs.lstatSync(path);
    } catch(erro){
        if(erro.code === 'ENOENT') {
            console.log(chalk.red(erro.code, 'File or diretory not found'));
            return
        }
    } 

    if(fs.lstatSync(path).isFile() === true) {
        const text = await getExtracedFile(path);
        printList(text);
    } else if(fs.lstatSync(path).isDirectory() === true) {
        const files = await fs.promises.readdir(path);
        files.forEach(async file => {
            const text = await getExtracedFile(`${path}/${file}`);
            printList(text, path);
        });
    }
}

textProcess(args);