import * as execa from 'execa';
import {parseArgs} from './parseArgs';

const cwd = process.cwd();
const viewPath = cwd.split('sparrow-server')[0] + 'sparrow-view'

const task = {
  id: viewPath,
  command: 'vue-cli-service serve --port 9000',
  path: viewPath
};

export function run () {
  let [command, ...args] = parseArgs(task.command);
  const child = execa(command, args, {
    cwd: task.path,
    stdio: ['inherit', 'pipe', 'pipe'],
    shell: true
  });

  child.stdout.on('data', buffer => {
    console.log(buffer.toString())
  })
  child.stderr.on('data', buffer => {
    console.log(buffer.toString());
  });

  child.on('error', error => {
    console.log(error);
  });
}