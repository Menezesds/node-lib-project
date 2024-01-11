import chalk from 'chalk';
import fs from 'fs';

function erroHandling(erro){
    throw new Error(chalk.red(erro.code, 'Theres no file in the directory'));
}

function getFile(path){
    const ecoding = 'utf-8';
    fs.readFile(path, ecoding, (erro, text) => {
        if(erro) erroHandling(erro);
        console.log(chalk.green(text));
    })
}

getFile('./src/text.md');