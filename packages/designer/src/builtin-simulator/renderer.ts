import React, { createElement, ReactInstance } from 'react';
import { ComponentInstance, NodeInstance, Component } from '../simulator';
import { NodeSchema } from '@alilc/lowcode-types';
import { computed, observable as obx, untracked, makeObservable, configure } from 'mobx';
import {
  isElement,
  setNativeSelection,
  cursor,
} from '@alilc/lowcode-utils';
import { BuiltinSimulatorHost } from './host';

export const FIBER_KEY = '_reactInternalFiber';

export interface BuiltinSimulatorRenderer {
  readonly isSimulatorRenderer: true;
  createComponent(schema: NodeSchema): Component | null;
  getComponent(componentName: string): Component;
  getClosestNodeInstance(from: ComponentInstance, nodeId?: string): NodeInstance<ComponentInstance> | null;
  findDOMNodes(instance: ComponentInstance): Array<Element | Text> | null;
  getClientRects(element: Element | Text): DOMRect[];
  setNativeSelection(enableFlag: boolean): void;
  setDraggingState(state: boolean): void;
  setCopyState(state: boolean): void;
  clearState(): void;
  run(): void;
}

export function isSimulatorRenderer(obj: any): obj is BuiltinSimulatorRenderer {
  return obj && obj.isSimulatorRenderer;
}

export class SimulatorRendererContainer implements BuiltinSimulatorRenderer {
  isSimulatorRenderer: true;
  private disposeFunctions: Array<() => void> = [];
  @obx.ref private _documentInstances: any[] = [];
  get documentInstances() {
    return this._documentInstances;
  }
  private host: BuiltinSimulatorHost;

  constructor() {
    makeObservable(this);
    this.host = (window as any).LCSimulatorHost;

    this.disposeFunctions.push(this.host.connect(this, () => {
      // sync layout config
      // this._layout = host.project.get('config').layout;

      // // todo: split with others, not all should recompute
      // if (this._libraryMap !== host.libraryMap || this._componentsMap !== host.designer.componentsMap) {
      //   this._libraryMap = host.libraryMap || {};
      //   this._componentsMap = host.designer.componentsMap;
      //   this.buildComponents();
      // }

      // // sync designMode
      // this._designMode = host.designMode;

      // this._locale = host.locale;

      // // sync requestHandlersMap
      // this._requestHandlersMap = host.requestHandlersMap;

      // // sync device
      // this._device = host.device;
    }));
  }


  createComponent(schema: NodeSchema): Component | null {
    throw new Error('Method not implemented.');
  }
  getComponent(componentName: string): Component {
    throw new Error('Method not implemented.');
  }

  getClosestNodeInstance(from: ReactInstance, nodeId?: string): NodeInstance<ReactInstance> | null {
    return getClosestNodeInstance(from, nodeId);
  }

  findDOMNodes(instance: ComponentInstance): (Element | Text)[] | null {
    throw new Error('Method not implemented.');
  }
  getClientRects(element: Element | Text): DOMRect[] {
    throw new Error('Method not implemented.');
  }

  setNativeSelection(enableFlag: boolean) {
    setNativeSelection(enableFlag);
  }

  setDraggingState(state: boolean) {
    cursor.setDragging(state);
  }

  setCopyState(state: boolean) {
    cursor.setCopy(state);
  }

  clearState() {
    cursor.release();
  }

  run(): void {
    throw new Error('Method not implemented.');
  }
  @obx.ref private _appContext: any = {};
  @computed get context(): any {
    return this._appContext;
  }

  @obx.ref private _componentsMap = {};
  @computed get componentsMap(): any {
    return this._componentsMap;
  }
  private _components: any = {};

  get components(): object {
    // 根据 device 选择不同组件，进行响应式
    // 更好的做法是，根据 device 选择加载不同的组件资源，甚至是 simulatorUrl
    return this._components;
  }

  dispose() {
    this.disposeFunctions.forEach(fn => fn());
    this.documentInstances.forEach(docInst => docInst.dispose());
    untracked(() => {
      this._componentsMap = {};
      this._components = null;
      this._appContext = null;
    });
  }
}

let REACT_KEY = '';
function cacheReactKey(el: Element): Element {
  if (REACT_KEY !== '') {
    return el;
  }
  // react17 采用 __reactFiber 开头
  REACT_KEY = Object.keys(el).find(
    (key) => key.startsWith('__reactInternalInstance$') || key.startsWith('__reactFiber$'),
  ) || '';
  if (!REACT_KEY && (el as HTMLElement).parentElement) {
    return cacheReactKey((el as HTMLElement).parentElement!);
  }
  return el;
}

const SYMBOL_VNID = Symbol('_LCNodeId');
const SYMBOL_VDID = Symbol('_LCDocId');
const NODE_ID = 'uid';

function getClosestNodeInstance(from: ReactInstance, specId?: string): NodeInstance<ReactInstance> | null {
  let el: any = from;
  if (el) {
    if (isElement(el)) {
      el = cacheReactKey(el);
    } else {
      return getNodeInstance(el[FIBER_KEY], specId);
    }
  }
  while (el) {
    if (NODE_ID in el.dataset) {
      const nodeId = el.dataset[NODE_ID];
      const docId = el[SYMBOL_VDID];
      if (!specId || specId === nodeId) {
        return {
          docId,
          nodeId,
          instance: el,
        };
      }
    }
    // get fiberNode from element
    // if (el[REACT_KEY]) {
    //   return getNodeInstance(el[REACT_KEY], specId);
    // }
    el = el.parentElement;
  }
  return null;
}

function getNodeInstance(fiberNode: any, specId?: string): NodeInstance<ReactInstance> | null {
  const instance = fiberNode?.stateNode;
  if (instance && SYMBOL_VNID in instance) {
    const nodeId = instance[SYMBOL_VNID];
    const docId = instance[SYMBOL_VDID];
    if (!specId || specId === nodeId) {
      return {
        docId,
        nodeId,
        instance,
      };
    }
  }
  if (!instance && !fiberNode?.return) return null;
  return getNodeInstance(fiberNode?.return);
}