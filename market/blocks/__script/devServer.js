const execa = require('execa');

const cwd = process.cwd();
console.log(cwd);

const task = {
  id: cwd,
  command: 'vue-cli-service serve',
  path: cwd
};
let child = null;
function run () {
  child = execa('vue-cli-service', ['serve'], {
    cwd: task.path,
    stdio: ['inherit', 'pipe', 'pipe'],
    shell: true
  });

  child.stdout.on('data', buffer => {
    console.log(buffer.toString())
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