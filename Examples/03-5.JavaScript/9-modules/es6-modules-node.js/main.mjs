/*must run with
node --experimental-modules main.mjs
*/

import {add} from './lib.mjs';
import path from 'path';

//Extract the filename from a file path:
let filename = path.basename('/Users/ae/demo-file.js');
console.log(filename);

console.log('Result: ', add(2, 3));