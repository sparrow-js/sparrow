import { Loading } from 'element-ui';
let loadingInstance = null;
export default {
  open() {
    loadingInstance = Loading.service({
      lock: true,
      background: 'rgba(0, 0, 0, 0)'
    });
  },
  close() {
    if (!loadingInstance) return;
    loadingInstance.close();
  }
};
