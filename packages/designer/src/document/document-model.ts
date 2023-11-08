import { computed, makeObservable, obx, action } from '@firefly/auto-editor-core';
import { NodeData, isJSExpression, isDOMText, NodeSchema, isNodeSchema, RootSchema, PageSchema, ComponentsMap } from '@alilc/lowcode-types';
import { EventEmitter } from 'events';
import { Project } from '../project';
import { ISimulatorHost } from '../simulator';
// import { ComponentMeta } from '../component-meta';
import { Node, ParentalNode, RootNode, isNode, NODE_ID } from './node/node';
import { Selection } from './selection';
// import { History } from './history';
// import { TransformStage, ModalNodesManager } from './node';
import { uniqueId, isPlainObject, compatStage } from '@alilc/lowcode-utils';
import { isDragNodeDataObject, DragNodeObject, DragNodeDataObject, DropLocation, Designer } from '../designer';


export type GetDataType<T, NodeType> = T extends undefined
  ? NodeType extends {
    schema: infer R;
  }
    ? R
    : any
  : T;

export class DocumentModel {
  rootNode: RootNode | null;

  /**
   * 文档编号
   */
  id: string = uniqueId('doc');

  /**
   * 选区控制
   */
  readonly selection: Selection = new Selection(this);

  /**
   * 操作记录控制
   */
  readonly history: History;

  /**
   * 模态节点管理
   */
//   readonly modalNodesManager: ModalNodesManager;

  private _nodesMap = new Map<string, Node>();

  readonly project: Project;

  readonly designer: Designer;

  @obx.shallow private nodes = new Set<Node>();

  private seqId = 0;

  private emitter: EventEmitter;

  private rootNodeVisitorMap: { [visitorName: string]: any } = {};

  private _modalNode?: ParentalNode;

  /**
   * @deprecated
   */
  private _addons: Array<{ name: string; exportData: any }> = [];
  @obx.ref private _opened = false;

  @obx.ref private _suspensed = false;
  /**
   * 是否为非激活状态
   */
   get suspensed(): boolean {
    return this._suspensed || !this._opened;
  }

  /**
   * 与 suspensed 相反，是否为激活状态，这个函数可能用的更多一点
   */
  get active(): boolean {
    return !this._suspensed;
  }

  /**
   * @deprecated 兼容
   */
  get actived(): boolean {
    return this.active;
  }

  /**
   * 模拟器
   */
  get simulator(): ISimulatorHost | null {
    return this.project.simulator;
  }

  get nodesMap(): Map<string, Node> {
    return this._nodesMap;
  }

  get modalNode() {
    return this._modalNode;
  }

  @obx.ref private _drillDownNode: Node | null = null;

  drillDown(node: Node | null) {
    this._drillDownNode = node;
  }

  get focusNode() {
    if (this._drillDownNode) {
      return this._drillDownNode;
    }
    const selector = this.designer.editor?.get<((rootNode: RootNode) => Node) | null>('focusNodeSelector');
    if (selector && typeof selector === 'function') {
      return selector(this.rootNode!);
    }
    return this.rootNode;
  }

  get currentRoot() {
    return this.modalNode || this.focusNode;
  }

  constructor(project: Project, schema?: RootSchema) {
    makeObservable(this);
    this.project = project;
    this.designer = this.project?.designer;
    this.emitter = new EventEmitter();
    // 这里需要搬走
    setTimeout(() => {
      this.rootNode = this.createNode<RootNode>(
        schema || {
          componentName: 'Page',
          id: 'root',
          fileName: '',
          instance: document.getElementById('root'),
        },
      );
    }, 2000);
  }

  open(): DocumentModel {
    const originState = this._opened;
    this._opened = true;

    return this;
  }

  createNode<T extends Node = Node, C = undefined>(data: GetDataType<C, T>, checkId: boolean = true): T {
    let schema: any;
    let node: Node | null = null;
    schema = data;

    node = new Node(this, schema);
    this._nodesMap.set(node.id, node);
    this.nodes.add(node);
    return node as any;
  }

  createParentNode(instance: HTMLElement, id: string) {
    return this.createNode({
      id,
      componentName: '',
      instance,
    });
  }


  /**
   * 根据 id 获取节点
   */
   getNode(id: string, instance?: any): Node | null {
   let node = this._nodesMap.get(id);
    if (node) {
      return node;
    }
    if (instance) {
      node = this.createNode({
        id: instance.dataset[NODE_ID],
        componentName: instance.tagName,
        instance,
      });
      return node;
    }
    return null;
  }
  @obx.ref private _dropLocation: DropLocation | null = null;

   /**
   * 内部方法，请勿调用
   */
    internalSetDropLocation(loc: DropLocation | null) {
      this._dropLocation = loc;
    }

    /**
     * 投放插入位置标记
     */
    get dropLocation() {
      return this._dropLocation;
    }

    checkDropTarget(dropTarget: ParentalNode, dragObject: DragNodeObject | DragNodeDataObject): boolean {
      let items: Array<Node | NodeSchema>;
      if (isDragNodeDataObject(dragObject)) {
        items = Array.isArray(dragObject.data) ? dragObject.data : [dragObject.data];
      } else {
        items = dragObject.nodes;
      }
      return items.every((item) => this.checkNestingUp(dropTarget, item));
    }

    /**
     * 检查对象对父级的要求，涉及配置 parentWhitelist
     */
    checkNestingUp(parent: ParentalNode, obj: NodeSchema | Node): boolean {
      // if (isNode(obj) || isNodeSchema(obj)) {
      //   const config = isNode(obj) ? obj.componentMeta : this.getComponentMeta(obj.componentName);
      //   if (config) {
      //     return config.checkNestingUp(obj, parent);
      //   }
      // }

      return true;
    }

    checkNesting(dropTarget: ParentalNode, dragObject: DragNodeObject | DragNodeDataObject): boolean {
      let items: Array<Node | NodeSchema>;
      if (isDragNodeDataObject(dragObject)) {
        items = Array.isArray(dragObject.data) ? dragObject.data : [dragObject.data];
      } else {
        items = dragObject.nodes;
      }
      return items.every((item) => this.checkNestingDown(dropTarget, item));
    }

    /**
     * 检查投放位置对子级的要求，涉及配置 childWhitelist
     */
    checkNestingDown(parent: ParentalNode, obj: NodeSchema | Node): boolean {
      // const config = parent.componentMeta;
      // return config.checkNestingDown(parent, obj) &&
      return this.checkNestingUp(parent, obj);
    }
}

export function isDocumentModel(obj: any): obj is DocumentModel {
  return obj && obj.rootNode;
}

export function isPageSchema(obj: any): obj is PageSchema {
  return obj?.componentName === 'Page';
}
