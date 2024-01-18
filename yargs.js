
import {textProcess} from './src/cli.js';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
  .options({
    path: { type: 'string', description: 'file or directory path for the md', demandOption: true },
    validation: { type: 'boolean', description: 'validate links' }

  }).argv;

  textProcess(argv)