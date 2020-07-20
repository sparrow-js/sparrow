import socket from './socket';
let viewFrame = null;
export function receiveMessage() {
  window.addEventListener(
    'message',
    async event => {
      const { data } = event;
      const uniqueId = data.uniqueId;
      if (data && data.handler) {
        const handlerFirst = data.handler.split('.')[0];
        if (handlerFirst !== 'generator') return;
        const result = await socket.emit(data.handler, data);
        if (!viewFrame) {
          viewFrame = document.querySelector('#viewContent');
        }
        if (result) {
          result.uniqueId = uniqueId;
          viewFrame.contentWindow.postMessage(result, '*');
        }
      }
    },
    false
  );
}
