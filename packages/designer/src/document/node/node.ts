
import { obx, computed, autorun, makeObservable, runInAction, action } from '@firefly/auto-editor-core';
import { DocumentModel } from '../document-model';
import { NodeChildren } from './node-children';
import { editInsertNode } from '../api';
import { getNearPath } from '@firefly/auto-utils';
// import {
//     isDOMText,
//     isJSExpression,
//     PropsMap,
//     PropsList,
//     NodeData,
//     I18nData,
//     SlotSchema,
//     PageSchema,
//     ComponentSchema,
//     NodeStatus,
//     CompositeValue,
//     GlobalEvent,
//     ComponentAction,
//   } from '@alilc/lowcode-types';

export interface NodeSchema {
    id?: string;
    componentName: string;
    instance: any;
    props?: any;
}

export interface ContainerSchema extends NodeSchema {
  /**
   * 'Block' | 'Page' | 'Component';
   */
   componentName: string;
   /**
    * 文件名称
    */
   fileName: string;
}
export interface PageSchema extends ContainerSchema {
    componentName: 'Page';
}

/**
 * 低代码业务组件容器
 * @see https://lowcode-engine.cn/lowcode
 */
export interface ComponentSchema extends ContainerSchema {
    componentName: 'Component';
}

export interface ParentalNode<T extends NodeSchema = NodeSchema> extends Node<T> {
    readonly children: NodeChildren;
}

export interface LeafNode extends Node {
    readonly children: null;
}

export type PageNode = ParentalNode<PageSchema>;
export type ComponentNode = ParentalNode<ComponentSchema>;
export type RootNode = PageNode | ComponentNode;

export type NodeData = NodeSchema;

export function isNode(node: any): node is Node {
    return node && node.isNode;
}

export const NODE_ID = 'uid';

export interface NodeParam {
  path: string;
  start: string;
  end: string;
  componentId: string;
  position?: number;
}

export class Node<Schema extends NodeSchema = NodeSchema> {
    readonly id: string;
    readonly componentName: string;
    readonly instance: any;
    title: string = '';
    /**
     * 是节点实例
     */
    readonly isNode = true;

    @obx.ref private _parent: ParentalNode | null = null;

    /**
     * 父级节点
     */
    get parent(): ParentalNode | null {
      return this._parent;
    }

    protected _children?: NodeChildren;

    /**
     * 当前节点子集
     */
    get children(): NodeChildren | null {
        return this._children || null;
    }

    /**
     * 当前节点深度
     */
    @computed get zLevel(): number {
        if (this._parent) {
        return this._parent.zLevel + 1;
        }
        return 0;
    }

    constructor(readonly document: DocumentModel, nodeSchema: Schema) {
        // makeObservable(this);
        const { id, componentName, instance } = nodeSchema;
        this.id = id || '';
        this.componentName = componentName;
        this.instance = instance;
        let firstChild = instance.querySelector('[data-uid]');
        const childInstance = [];
        while (firstChild) {
            childInstance.push({
                id: firstChild.dataset[NODE_ID],
                componentName: '',
                instance: firstChild,
            });
            firstChild = firstChild.nextElementSibling;
        }
        if (childInstance.length > 0) {
            this._children = new NodeChildren(this as ParentalNode, childInstance);
        }
        // const child = instance.children || [];
        // child.forEach((item) => {
        //     const nodeId = item.dataset[NODE_ID];
        // });
    }

    getParent() {
        return this.parent;
    }

    /**
     * 是否一个父亲类节点
     */
    isParental(): this is ParentalNode {
        return !this.isLeaf();
    }

    /**
     * 终端节点，内容一般为 文字 或者 表达式
     */
    isLeaf(): this is LeafNode {
        return this.componentName === 'Leaf';
    }

    isRoot(): boolean {
        return this.document.rootNode === (this as any);
    }

    removeNode() {
      //
    }
}

export function getZLevelTop(child: Node, zLevel: number): Node | null {
    let l = child.zLevel;
    if (l < zLevel || zLevel < 0) {
      return null;
    }
    if (l === zLevel) {
      return child;
    }
    let r: any = child;
    while (r && l-- > zLevel) {
      r = r.parent;
    }
    return r;
}

/*
* 测试两个节点是否为包含关系
* @param node1 测试的父节点
* @param node2 测试的被包含节点
* @returns 是否包含
*/
export function contains(node1: Node, node2: Node): boolean {
 if (node1 === node2) {
   return true;
 }

 if (!node1.isParental() || !node2.parent) {
   return false;
 }

 const p = getZLevelTop(node2, node1.zLevel);
 if (!p) {
   return false;
 }

 return node1 === p;
}

export function isRootNode(node: Node): node is RootNode {
    return node && node.isRoot();
}

export function insertChildren(
    loc: any,
  ): any {
    const containerId = loc.target.id;
    const { detail: { near } } = loc;
    const nearData = {
      pos: near.pos,
      id: near.node.id,
    };
    editInsertNode({
      containerId,
      path: getNearPath(loc.target.instance),
      near: nearData,
    });
  }