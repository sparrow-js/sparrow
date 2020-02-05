import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import * as userHome from 'user-home';

const Conf = require('conf');

const confPath = path.join(userHome, '.sparrow');

if (!fs.existsSync(confPath)) {
  mkdirp(confPath);
}

const schema = {
  workFolder: {
    type: 'string',
    default: userHome,
  }
};

export { schema };

export default new Conf({
  schema,
  configName: 'db',
  cwd: confPath,
});
