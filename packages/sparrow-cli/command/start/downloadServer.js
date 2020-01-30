const userHome = require('user-home')
const getNpmTarball = require('../../lib/getNpmTarball');
const extractTarball = require('../../lib/extractTarball');
const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');


const NPM_NAME = 'sparrow-server';
const DEST_DIR = path.join(userHome, `.sparrow/${NPM_NAME}`);
const REGISTRY = process.env.REGISTRY || 'https://registry.npm.taobao.org';

module.exports = function downloadServer(version = 'latest') {
  const npmName = NPM_NAME;
  const destDir = DEST_DIR;

  console.log('>>> start download sparrow-server', version, destDir, REGISTRY);
  return getNpmTarball(npmName, version, REGISTRY)
  .then((tarballURL) => {
    console.log('>>> download sparrow-server from npm', tarballURL);
    return extractTarball({ tarballURL, destDir });
  })
  .catch((err) => {
    console.log();
    console.log(chalk.red('Error: download sparrow-server error'));
    console.log();
    console.log(err);
    process.exit(1);
  })
  .then(() => {
    console.log('>>> download sparrow-server completed');
    console.log('>>> start installing sparrow-server dependencies');
    return install(destDir);
  })
  .then(() => {
    console.log('>>> install sparrow-server dependencies completed');
  })
  .catch((err) => {
    console.log();
    console.log(chalk.red('提示：安装依赖失败，重新安装。'));
  });

}

function install(cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn('npm', ['install', '--loglevel', 'silly', '--registry', REGISTRY], {
      stdio: ['pipe'],
      cwd,
    });

    child.stdout.on('data', data => {
      console.log(data.toString());
    });

    child.stderr.on('data', data => {
      console.log(data.toString());
    });

    child.on('error', error => {
      reject(error);
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log('>>> install completed');
        resolve();
      } else {
        reject(new Error('install deps error'));
      }
    });
  });
}
