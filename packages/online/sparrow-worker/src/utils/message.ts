import _ from 'lodash';
import { v4 as uuid } from '@lukeed/uuid';

const message:any = {};
const messageMap = new Map();
const quequ = [];
const taskQuequ = [];
let generate = null;
let tasking = false;

async function handlerTask (data: any) {
  tasking = true;
  const handlerArr = data.handler.split('.');

  if (data && data.uniqueId) {
    if (messageMap.has(data.uniqueId)) {
      const curMessage = messageMap.get(data.uniqueId);
      curMessage.resolve(data);
    } else if (handlerArr[0] === 'generator' && generate) {
      const res = await generate[handlerArr[1]][handlerArr[2]](data);
      window.parent.postMessage({
        handler: 'callback',
        uniqueId: data.uniqueId,
        data: res
      }, '*');
    }
  }

  const findMessage = quequ.find(item => item.handler === data.handler);
  if (findMessage) {
    findMessage.callback(data);
  }
  tasking = false;
  if (taskQuequ.length > 0) {
    const curTask = taskQuequ.shift();
    handlerTask(curTask);
  }
}

window.addEventListener('message', async (event) => {
  const {data} = event;
  console.log('sparrow-worker', data);

  if (tasking) {
    taskQuequ.push(_.cloneDeep(data));
  } else {
    handlerTask(_.cloneDeep(data));
  }
 
}, false)

message.emit = (handler, data:any = {}) => {
  data.uniqueId = uuid();
  data.handler = handler || '';
  return new Promise((resolve, reject) => {
    window.parent.postMessage(data, '*');
    messageMap.set(data.uniqueId, {
      resolve,
      reject
    })
  });
}

message.on = (handler, callback) => {
  quequ.push({
    handler,
    callback,
  });
}

message.init = (generateIns) => {
  generate = generateIns;
};

export default message;