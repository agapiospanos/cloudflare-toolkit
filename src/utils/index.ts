import util from 'util';
import fs from 'fs';

export const writeFileAsync = util.promisify(fs.writeFile);
