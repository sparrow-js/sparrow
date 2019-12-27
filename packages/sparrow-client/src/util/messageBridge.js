import socket from "./socket";

export function receiveMessage() {
  window.addEventListener(
    "message",
    async event => {
      const { data } = event;
      if (data && data.handler) {
        const result = await socket.emit(data.handler, data);
        console.log(result);
      }
    },
    false
  );
}
