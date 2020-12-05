import _ from 'lodash';
import { v4 as uuid } from '@lukeed/uuid';

const message:any = {};
const messageMap = new Map();
const quequ:any = [];
let generate:any = null;
// let viewFrame:any = null;

window.addEventListener('message', async (event) => {
  console.log('sparrow-online-view', event);
  const {data} = event;
  const handlerArr = data.handler && data.handler.split('.');
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

  if (data.codesandbox === true) {
    window.parent.postMessage({
      handler: 'codesandbox',
      data,
    }, '*');
  }

  const findMessage = quequ.find((item: any) => item.handler === data.handler);
  if (findMessage) {
    findMessage.callback(data);
  }

  // if (handlerArr[0] === 'view') {
  //   if (!viewFrame) {
  //     viewFrame = document.querySelector('#viewContent');
  //   }
  //   viewFrame && viewFrame.contentWindow.postMessage(data, '*');
  // }
 
}, false)

message.emit = (handler: string, data:any = {}) => {
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

message.on = (handler: string, callback: any) => {
  quequ.push({
    handler,
    callback,
  });
}

message.init = (generateIns: any) => {
  generate = generateIns;
};

export default message;