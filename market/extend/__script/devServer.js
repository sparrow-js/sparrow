
const execa = require('execa');
const cwd = process.cwd();

const task = {
  id: cwd,
  command: 'vue-cli-service serve',
  path: cwd
};

let child = null;
function run (callback) {
  child = execa('vue-cli-service', ['serve'], {
    cwd: task.path,
    stdio: ['inherit', 'pipe', 'pipe'],
    shell: true
  });

  child.stdout.on('data', buffer => {
    if (/DONE/.test(buffer.toString())) {
      callback();
    }
  })
  child.stderr.on('data', buffer => {
    console.log(buffer.toString());
  })
}

function stop () {
  if (child) {
    child.cancel()
  }
}


module.exports = {
  run,
  stop
};