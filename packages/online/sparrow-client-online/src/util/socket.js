import io from 'socket.io-client';
import loading from './loading';
import { Notification } from 'element-ui';

const socket = io(window.socketUrl || '//127.0.0.1:7001/', {
  reconnectionAttempts: 3,
  transports: ['websocket']
});

socket.on('error', error => {
  window.console.log('error');
});

socket.on('connect', () => {
  window.console.log('服务连接成功');
});

socket.on('reconnecting', () => {
  window.console.log('reconnecting');
});

socket.on('reconnect_failed', () => {
  window.console.log('reconnect_failed');
});

socket.on('disconnect', () => {
  window.console.log('disconnect');
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
        loading.close();
        Notification.error({
          title: '错误',
          message: error.message || '报错了！'
        });
        reject(error);
      } else {
        resolve(data);
      }
    });

    originalEmit(...args);
  });
};

export default socket;
