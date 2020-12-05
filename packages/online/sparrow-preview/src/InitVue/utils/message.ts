
export default {
  '/src/utils/message.js': 
    {
      code: `
import _ from 'lodash';
import { Event } from '@sparrow-vue/boxs';

const message = {};
const messageMap = new Map();

window.addEventListener('message', (event) => {
  const {data} = event;
  if (data && data.uniqueId && messageMap.has(data.uniqueId)) {
    const curMessage = messageMap.get(data.uniqueId);
    curMessage.resolve(data);
  } 

  if(data.handler === 'view.component.selected') {
    Event.emit('component-active-change', {
      uuid: data.uuid
    })
  }

}, false)

message.emit = (handler, data = {}) => {
  data.uniqueId = _.uniqueId('message_');
  data.handler = handler || '';
  return new Promise((resolve, reject) => {
    window.parent.parent.postMessage(data, '*');
    messageMap.set(data.uniqueId, {
      resolve,
      reject
    })
  });
}

export default message;
      `
    }    
  
}