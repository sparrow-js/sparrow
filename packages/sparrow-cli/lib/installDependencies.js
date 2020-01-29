const spawn = require('cross-spawn');

module.exports = (cwd, registry)=> {
  return new Promise((resolve, reject) => {
    const child = spawn('npm', ['install', '--loglevel', 'silly', '--registry', registry], {
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