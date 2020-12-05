import _ from 'lodash';
import { v4 as uuid } from '@lukeed/uuid';

const message:any = {};
const messageMap = new Map();
const quequ = [];
const taskQuequ = [];
let tasking = false;
let viewFrame = null;
let workerFrame = null;

async function handlerTask(data) {
  tasking = true;
  if (data.handler === 'generate-file') {
    if (!viewFrame) {
      viewFrame = document.querySelector('#viewContent');
    }
    viewFrame && viewFrame.contentWindow.postMessage(data, '*');
  }

  if (data && data.uniqueId && messageMap.has(data.uniqueId)) {
    const curMessage = messageMap.get(data.uniqueId);
    curMessage.resolve(data);
  }

  const findMessage = quequ.find(item => item.handler === data.handler);
  if (findMessage) {
    findMessage.callback.forEach(callbackItem => {
      callbackItem(data);
    })
  }
  tasking = false;
  if (taskQuequ.length > 0) {
    const curTask = taskQuequ.shift();
    handlerTask(curTask);
  }
}

window.addEventListener('message', (event) => {
  const {data} = event;
  console.log('sparrow-client-online',  _.cloneDeep(data));
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
    if (!workerFrame) {
      workerFrame = document.querySelector('#sparrowWorker');
    }

    workerFrame && workerFrame.contentWindow.postMessage(data, '*');
    messageMap.set(data.uniqueId, {
      resolve,
      reject
    })
  });
}

message.emitView = (handler, data: any = {}) => {
  data.uniqueId = uuid();
  data.handler = handler || '';
  return new Promise((resolve, reject) => {
    if (!viewFrame) {
      viewFrame = document.querySelector('#viewContent');
    }

    viewFrame && viewFrame.contentWindow.postMessage(data, '*');
    messageMap.set(data.uniqueId, {
      resolve,
      reject
    })
  });
}

message.emitPreview = (handler, data: any = {}) => {
  data.uniqueId = uuid();
  data.handler = handler || '';
  return new Promise((resolve, reject) => {
    if (!viewFrame) {
      viewFrame = document.querySelector('#viewContent');
    }

    viewFrame && viewFrame.contentWindow.postMessage(data, '*');
    messageMap.set(data.uniqueId, {
      resolve,
      reject
    })
  });
};

message.on = (handler, callback) => {
  const findTaskIndex = quequ.findIndex(item => item.handler === handler);
  if (findTaskIndex >= 0) {
    const findTask = quequ[findTaskIndex];
    findTask.callback.push(callback);
  } else {
    const callbackArr = [callback];
    quequ.push({
      handler,
      callback: callbackArr,
    });
  }
  

}

export default message;