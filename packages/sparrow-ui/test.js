const execa = require('execa');

const task = {
  id: '/Users/haitaowu/real-lab/sparrow/packages/sparrow-view',
  command: 'vue-cli-service serve --port 9000',
  path: '/Users/haitaowu/real-lab/sparrow/packages/sparrow-view'
};

const child = execa('vue-cli-service', ['serve'], {
  cwd: '/Users/haitaowu/real-lab/sparrow/packages/sparrow-view',
  stdio: ['inherit', 'pipe', 'pipe'],
  shell: true
});

child.stdout.on('data', buffer => {
  console.log(buffer.toString())
})
child.stderr.on('data', buffer => {
  console.log(buffer.toString());
})