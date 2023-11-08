import { observer } from 'mobx-react';
import { configure } from 'mobx';
configure({
  enforceActions: 'never'
});

// 常用的直接导出，其他的以 mobx 命名空间导出
export { observable as obx, observable, observe, autorun, makeObservable, makeAutoObservable, reaction, computed, action, runInAction, untracked } from 'mobx';
import * as _mobx from 'mobx';
export { _mobx as mobx };
export { observer };