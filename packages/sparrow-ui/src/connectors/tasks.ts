
import execa from 'execa';
import RunViewTask from './RunViewTask';
import {parseArgs} from '../util/parseArgs'

const tasks = new Map();

function addTask(id: string, context: any) {
  if (id) {
    tasks.set(id, context);
  }
}

addTask(RunViewTask.id, RunViewTask);

function getTask (id: string) : any {
  return tasks.get(id);
}

export async function run (id: string, context?:any) {
  const task = getTask(id);
  let [command, ...args] = parseArgs(task.command);
  console.log('****************');
  console.log(task);

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
  })
}

async function stop(id: string, context: any) {

}