import { makeObservable, obx } from '@firefly/auto-editor-core';
import { EventEmitter } from 'events';
import { DocumentModel } from '../document';

const DETECTING_CHANGE_EVENT = 'detectingChange';

export class Detecting {
  @obx.ref private _enable = true;

  get enable() {
    return this._enable;
  }

  set enable(flag: boolean) {
    this._enable = flag;
    if (!flag) {
      this._current = null;
    }
  }

  @obx.ref xRayMode = false;

  @obx.ref private _current: any | null = null;

  private emitter: EventEmitter = new EventEmitter();

  constructor() {
    makeObservable(this);
  }

  get current() {
    return this._current;
  }

  capture(node: any | null) {
    if (this._current !== node) {
      this._current = node;
      this.emitter.emit(DETECTING_CHANGE_EVENT, this.current);
    }
  }

  release(node: any | null) {
    if (this._current === node) {
      this._current = null;
      this.emitter.emit(DETECTING_CHANGE_EVENT, this.current);
    }
  }

  leave(document: DocumentModel | undefined) {
    if (this.current && this.current.document === document) {
      this._current = null;
    }
  }

  onDetectingChange(fn: (node: any) => void) {
    this.emitter.on(DETECTING_CHANGE_EVENT, fn);
    return () => {
      this.emitter.off(DETECTING_CHANGE_EVENT, fn);
    };
  }
}
