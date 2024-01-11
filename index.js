import chalk from 'chalk';
import fs from 'fs';

function erroHandling(erro){
    throw new Error(chalk.red(erro.code, 'Theres no file in the directory'));
}
async function getFile(path){
    const ecoding = 'utf-8';
    try{
        const texto = await fs.promises.readFile(path, ecoding);
        console.log(chalk.green(texto));
    } catch(erro){erroHandling(erro)}
}

getFile('./src/text.md');