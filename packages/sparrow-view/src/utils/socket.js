import io from 'socket.io-client';

// ref: https://socket.io/docs/client-api/#new-Manager-url-options
const socket = io('//127.0.0.1:7001/', {
  // number of reconnection attempts before giving up
  reconnectionAttempts: 3,

  // Note: Why set up websocket
  // MR：https://github.com/alibaba/ice/pull/2450
  // Refs：https://socket.io/docs/client-api/#With-websocket-transport-only
  transports: ['websocket'],
});

socket.on('error', error => {
  window.console.log('error')
});

socket.on('connect', () => {
  window.console.log('服务连接成功')
});

socket.on('reconnecting', () => {
  window.console.log('reconnecting')
});

socket.on('reconnect_failed', () => {
  window.console.log('reconnect_failed')
});

socket.on('disconnect', () => {
  window.console.log('disconnect')
});

const originalEmit = socket.emit.bind(socket);
socket.emit = function emit(...args) {
  return new Promise((resolve, reject) => {
    const eventNameStr = args[0];

    if (eventNameStr.indexOf('adapter') > -1) {
      const eventNameArr = eventNameStr.split('.');
      const [namespace, module, action] = eventNameArr;
    }

    if (!args[1]) {
      args.push({});
    }

    args.push((error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });

    originalEmit(...args);
  });
};

export default socket;
