import { Node, ParentalNode } from './node';
import { EventEmitter } from 'events';

import { obx, computed, globalContext, makeObservable } from '@firefly/auto-editor-core';

export interface IOnChangeOptions {
    type: string;
    node: Node;
}

export class NodeChildren {
    @obx.shallow private children: Node[];
    private emitter = new EventEmitter();
    /**
     * 元素个数
     */
    @computed get size(): number {
        return this.children.length;
    }
    /**
     * 是否空
     */
    isEmpty() {
        return this.size < 1;
    }

    notEmpty() {
        return this.size > 0;
    }

    @computed get length(): number {
        return this.children.length;
    }

    /**
     * 根据索引获得节点
     */
    get(index: number): Node | null {
        return this.children.length > index ? this.children[index] : null;
    }

    constructor(readonly owner: ParentalNode, data: any | any[], options: any = {}) {
        makeObservable(this);
        this.children = (Array.isArray(data) ? data : [data]).map((child) => {
          return this.owner.document.createNode(child, options.checkId);
        });
    }
}