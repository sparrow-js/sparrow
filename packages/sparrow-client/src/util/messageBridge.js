import socket from "./socket";
let viewFrame = null;
export function receiveMessage() {
  window.addEventListener(
    "message",
    async event => {
      const { data } = event;
      if (data && data.handler) {
        const result = await socket.emit(data.handler, data);
        if (!viewFrame) {
          viewFrame = document.querySelector("#viewContent");
        }
        result.uniqueId = data.uniqueId;
        viewFrame.contentWindow.postMessage(result, '*')
      }
    },
    false
  );
}
