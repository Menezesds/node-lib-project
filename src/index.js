import chalk from 'chalk';
import fs from 'fs';

function extractLink(texto){
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const arrayResultados = [...texto.matchAll(regex)];
    const results = arrayResultados.map(array => ({[array[1]]: array[2]}));
    
    return results.length === 0 ? chalk.black.bgRed('Não há links') : results;
}

function erroHandling(erro){
    throw new Error(chalk.red(erro.code, 'Theres no file in the directory'));
}

export default async function getExtracedFile(path){
    const ecoding = 'utf-8';
    try{
        const text = await fs.promises.readFile(path, ecoding);
        //console.log(chalk.green(text));
        return extractLink(text);
    } catch(erro){erroHandling(erro)}
}