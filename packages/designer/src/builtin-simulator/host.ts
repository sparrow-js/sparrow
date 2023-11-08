
import {
    AssetLevel,
    Asset,
    AssetList,
    assetBundle,
    assetItem,
    AssetType,
    isElement,
    isFormEvent,
    hasOwnProperty,
    UtilsMetadata,
    getClosestNode,
} from '@alilc/lowcode-utils';
import {
    obx,
    autorun,
    reaction,
    computed,
    engineConfig,
    IReactionPublic,
    IReactionOptions,
    IReactionDisposer,
    makeObservable,
    hotkey,
  } from '@firefly/auto-editor-core';
import {
    ComponentMetadata,
    ComponentSchema,
    TransformStage,
    ActivityData,
    Package,
    NodeSchema,
} from '@alilc/lowcode-types';

import {
    ISimulatorHost,
    Component,
    NodeInstance,
    ComponentInstance,
    DropContainer,
    IViewport,
} from '../simulator';
import Viewport from './viewport';
import {
    Designer,
    isShaken,
    DragObjectType,
    LocateEvent,
    DragNodeObject,
    isLocationData,
    isDragAnyObject,
    isDragNodeObject,
    LocationChildrenDetail,
    LocationDetailType,
    CanvasPoint,
    Rect,
    getRectTarget,
    isChildInline,
    isRowContainer,
} from '../designer';
import { BuiltinSimulatorRenderer, SimulatorRendererContainer } from './renderer';

import { createSimulator } from './create-simulator';

import { Project } from '../project';
import { Node, contains, isRootNode, ParentalNode } from '../document';
import { getClosestClickableNode } from './utils/clickable';
import { Scroller } from '../designer/scroller';

export interface LibraryItem extends Package{
    package: string;
    library: string;
    urls?: Asset;
    editUrls?: Asset;
}

export interface BuiltinSimulatorProps {
    // 从 documentModel 上获取
    // suspended?: boolean;
    designMode?: 'live' | 'design' | 'preview' | 'extend' | 'border';
    device?: 'mobile' | 'iphone' | string;
    deviceClassName?: string;
    environment?: Asset;
    // @TODO 补充类型
    /** @property 请求处理器配置 */
    requestHandlersMap?: any;
    extraEnvironment?: Asset;
    library?: LibraryItem[];
    utilsMetadata?: UtilsMetadata;
    simulatorUrl?: Asset;
    theme?: Asset;
    componentsAsset?: Asset;
    [key: string]: any;
}

export interface DeviceStyleProps {
    canvas?: object;
    viewport?: object;
}

export class BuiltinSimulatorHost implements ISimulatorHost<BuiltinSimulatorProps> {
    isSimulator: true;
    readonly viewport = new Viewport();
    readonly project: Project;
    private _iframe?: HTMLIFrameElement;
    readonly scroller: Scroller;

    readonly designer: Designer;

    @obx.ref _props: BuiltinSimulatorProps = {};

    @computed get deviceStyle(): DeviceStyleProps | undefined {
        return this.get('deviceStyle');
    }

    @computed get deviceClassName(): string | undefined {
        return this.get('deviceClassName');
    }

    @computed get device(): string {
        return this.get('device') || 'default';
    }

    @obx.ref private _contentWindow?: Window;

    get contentWindow() {
      return this._contentWindow;
    }

    @obx.ref private _contentDocument?: Document;

    get contentDocument() {
      return this._contentDocument;
    }

    @computed get designMode(): 'live' | 'design' | 'preview' {
        // renderer 依赖
        // TODO: 需要根据 design mode 不同切换鼠标响应情况
        return this.get('designMode') || 'design';
    }


    constructor(project: Project) {
        makeObservable(this);
        this.project = project;
        this.designer = project?.designer;
        this.scroller = this.designer.createScroller(this.viewport);
    }

    get currentDocument() {
        return this.project.currentDocument;
    }

    /**
     * @see ISimulator
     */
    setProps(props: BuiltinSimulatorProps) {
        this._props = props;
    }

    get(key: string): any {
        if (key === 'device') {
          return (
            this.designer?.editor?.get('deviceMapper')?.transform?.(this._props.device) ||
            this._props.device
          );
        }
        return this._props[key];
    }

    set(key: string, value: any): void {
        throw new Error('Method not implemented.');
    }

      /**
   * 有 Renderer 进程连接进来，设置同步机制
   */
  connect(
    renderer: BuiltinSimulatorRenderer,
    effect: (reaction: IReactionPublic) => void, options?: any,
  ) {
    this._renderer = renderer;
    return autorun(effect, options);
  }

  modifySimulatorUrl(iframeUrl: string, url?: string) {
    this._props.simulatorUrl = iframeUrl;
    this._iframe && (this._iframe.src = this._props.simulatorUrl);
    if (url) {
      history.pushState({}, '', url);
    }
  }


  private _renderer?: BuiltinSimulatorRenderer;

  get renderer() {
    return this._renderer;
  }

    async mountContentFrame(iframe: HTMLIFrameElement | null) {
        if (!iframe || this._iframe === iframe) {
            return;
        }
        this._iframe = iframe;
        iframe.addEventListener('load', async () => {
            try {
              createSimulator(this, iframe);
            } catch (e) {
              console.error(e);
            }
          const simulatorRenderer = new SimulatorRendererContainer();
          simulatorRenderer.dispose();
            this._contentWindow = iframe.contentWindow!;
            this._contentDocument = this._contentWindow.document;
            // wait 准备 iframe 内容、依赖库注入
            hotkey.mount(iframe.contentWindow as Window);
            this.setupEvents();
            this.viewport.setScrollTarget(this._contentWindow);
        });
    }

    setupEvents() {
        this.setupDragAndClick();
        this.setupDetecting();
    }

    setupDragAndClick() {
        const { designer } = this;
        const doc = this.contentDocument!;
        doc.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
        });
        doc.addEventListener(
            'mousedown', (downEvent: MouseEvent) => {
                const documentModel = this.project.currentDocument;
                if (!documentModel) {
                    return;
                }
                const { selection } = documentModel;
                const nodeInst = this.getNodeInstanceFromElement(downEvent.target as Element);
                const nodeSchea = getClosestClickableNode(nodeInst, downEvent);
                const node = documentModel.createNode(nodeSchea);
                if (!node) {
                    return;
                }

                downEvent.stopPropagation();
                downEvent.preventDefault();

                const checkSelect = (e: MouseEvent) => {
                    doc.removeEventListener('mouseup', checkSelect, true);
                    if (!isShaken(downEvent, e)) {
                        let { id } = node;
                        selection.select(id);
                    }
                };
                let nodes: Node[] = [node];
                designer.dragon.boost(
                  {
                    type: DragObjectType.Node,
                    nodes,
                  },
                  downEvent,
                  undefined,
                );

                doc.addEventListener('mouseup', checkSelect, true);
            },
        );
    }

    /**
   * 设置悬停处理
   */
  setupDetecting() {
    const doc = this.contentDocument!;
    const { detecting, dragon } = this.designer;
    const hover = (e: MouseEvent) => {
        if (!detecting.enable || this.designMode !== 'design') {
            return;
        }
        const nodeInst = this.getNodeInstanceFromElement(e.target as Element);
        if (nodeInst) {
        //   let node = nodeInst.node;
        //   const focusNode = node.document?.focusNode;
        //   if (node.contains(focusNode)) {
        //     node = focusNode;
        //   }
          detecting.capture(nodeInst);
        } else {
          detecting.capture(null);
        }
        if (!engineConfig.get('enableMouseEventPropagationInCanvas', false) || dragon.dragging) {
          e.stopPropagation();
        }
    };
    const leave = () => detecting.leave(this.project.currentDocument);
    doc.addEventListener('mouseover', hover, true);
    doc.addEventListener('mouseleave', leave, false);

    // doc.addEventListener(
    //     'mousemove',
    //     (e: Event) => {
    //       if (!engineConfig.get('enableMouseEventPropagationInCanvas', false) || dragon.dragging) {
    //         e.stopPropagation();
    //       }
    //     },
    //     true,
    // );
  }

  getNodeInstanceFromElement(target: Element | null): NodeInstance<ComponentInstance> | null {
    if (!target) {
      return null;
    }

    const nodeIntance = this.getClosestNodeInstance(target);
    if (!nodeIntance) {
      return null;
    }
    const { docId } = nodeIntance;
    const doc = this.project.getDocument(docId)!;
    const node = doc.getNode(nodeIntance.nodeId, target);
    return {
      ...nodeIntance,
      node,
    };
  }

    setSuspense(suspensed: boolean): void {
        throw new Error('Method not implemented.');
    }

    /**
     * @see ISimulator
     */
    setNativeSelection(enableFlag: boolean) {
      this.renderer?.setNativeSelection(enableFlag);
    }

    /**
     * @see ISimulator
     */
    setDraggingState(state: boolean) {
      this.renderer?.setDraggingState(state);
    }

    /**
     * @see ISimulator
     */
    setCopyState(state: boolean) {
      this.renderer?.setCopyState(state);
    }

    /**
     * @see ISimulator
     */
    clearState() {
      this.renderer?.clearState();
    }

    private _sensorAvailable = true;

    /**
     * @see ISensor
     */
    get sensorAvailable(): boolean {
      return this._sensorAvailable;
    }

    /**
     * @see ISensor
     */
    fixEvent(e: LocateEvent): LocateEvent {
      if (e.fixed) {
        return e;
      }

      const notMyEvent = e.originalEvent.view?.document !== this.contentDocument;
      // fix canvasX canvasY : 当前激活文档画布坐标系
      if (notMyEvent || !('canvasX' in e) || !('canvasY' in e)) {
        const l = this.viewport.toLocalPoint({
          clientX: e.globalX,
          clientY: e.globalY,
        });
        e.canvasX = l.clientX;
        e.canvasY = l.clientY;
      }

      // fix target : 浏览器事件响应目标
      if (!e.target || notMyEvent) {
        if (!isNaN(e.canvasX!) && !isNaN(e.canvasY!)) {
          e.target = this.contentDocument?.elementFromPoint(e.canvasX!, e.canvasY!);
        }
      }

      // 事件已订正
      e.fixed = true;
      return e;
    }

    scrollToNode(node: Node, detail?: any): void {
        throw new Error('Method not implemented.');
    }
    generateComponentMetadata(componentName: string): ComponentMetadata {
        throw new Error('Method not implemented.');
    }
    getComponent(componentName: string) {
        throw new Error('Method not implemented.');
    }

    @obx private instancesMap: {
        [docId: string]: Map<string, ComponentInstance[]>;
    } = {};

    setInstance(docId: string, id: string, instances: ComponentInstance[] | null) {
        if (!hasOwnProperty(this.instancesMap, docId)) {
            this.instancesMap[docId] = new Map();
        }
        if (instances == null) {
            this.instancesMap[docId].delete(id);
        } else {
            this.instancesMap[docId].set(id, instances.slice());
        }
    }

    getComponentInstances(node: Node, context?: NodeInstance): ComponentInstance[] | null {
        const docId = 0;
        const instances = this.instancesMap[docId]?.get(node.id) || [node.instance] || null;
        if (!instances || !context) {
            return instances;
        }

        // filter with context
        return instances.filter((instance) => {
            return this.getClosestNodeInstance(instance, context.nodeId)?.instance === context.instance;
        });
    }
    createComponent(schema: NodeSchema): Component | null {
        throw new Error('Method not implemented.');
    }
    /**
     * @see ISimulator
     */
    getComponentContext(/* node: Node */): any {
        throw new Error('Method not implemented.');
    }

    /**
   * @see ISimulator
   */
   getClosestNodeInstance(
        from: ComponentInstance,
        specId?: string,
    ): NodeInstance<ComponentInstance> | null {
        return this.renderer?.getClosestNodeInstance(from, specId) || null;
    }

    /**
     * @see ISimulator
     */
    computeRect(node: Node): Rect | null {
      const instances = this.getComponentInstances(node);
      if (!instances) {
        return null;
      }
      return this.computeComponentInstanceRect(instances[0], undefined);
    }

    computeComponentInstanceRect(instance: ComponentInstance, selector?: string | undefined): Rect | null {
        const renderer = this.renderer!;
        const elements = this.findDOMNodes(instance, selector);
        if (!elements) {
          return null;
        }

        const elems = elements.slice();
        let rects: DOMRect[] | undefined;
        let last: { x: number; y: number; r: number; b: number } | undefined;
        let _computed = false;
        while (true) {
          if (!rects || rects.length < 1) {
            const elem = elems.pop();
            if (!elem) {
              break;
            }
            rects = isElement(elem) ? [elem.getBoundingClientRect()] : [];
          }
          const rect = rects.pop();
          if (!rect) {
            break;
          }
          if (rect.width === 0 && rect.height === 0) {
            continue;
          }
          if (!last) {
            last = {
              x: rect.left,
              y: rect.top,
              r: rect.right,
              b: rect.bottom,
            };
            continue;
          }
          if (rect.left < last.x) {
            last.x = rect.left;
            _computed = true;
          }
          if (rect.top < last.y) {
            last.y = rect.top;
            _computed = true;
          }
          if (rect.right > last.r) {
            last.r = rect.right;
            _computed = true;
          }
          if (rect.bottom > last.b) {
            last.b = rect.bottom;
            _computed = true;
          }
        }
        if (last) {
          const r: any = new DOMRect(last.x, last.y, last.r - last.x, last.b - last.y);
          r.elements = elements;
          r.computed = _computed;
          return r;
        }

        return null;
    }
    /**
     * @see ISimulator
     */
    findDOMNodes(instance: ComponentInstance, selector?: string): Array<Element | Text> | null {
        const elements = [instance as Element];
        if (!elements) {
            return null;
        }

        if (selector) {
            const matched = getMatched(elements, selector);
            if (!matched) {
                return null;
            }
            return [matched];
        }
        return elements;
    }

    /**
     * @see ISensor
     */
    isEnter(e: LocateEvent): boolean {
      const rect = this.viewport.bounds;
      return (
        e.globalY >= rect.top &&
        e.globalY <= rect.bottom &&
        e.globalX >= rect.left &&
        e.globalX <= rect.right
      );
    }

    private sensing = false;

    /**
     * @see ISensor
     */
    deactiveSensor() {
      this.sensing = false;
      // this.scroller.cancel();
    }


    /**
   * @see ISensor
   */
  locate(e: LocateEvent): any {
    const { dragObject } = e;
    const { nodes } = dragObject as DragNodeObject;

    const operationalNodes = nodes;
    // ?.filter((node) => {
    //   const onMoveHook = node.componentMeta?.getMetadata()?.configure.advanced?.callbacks?.onMoveHook;
    //   const canMove = onMoveHook && typeof onMoveHook === 'function' ? onMoveHook(node.internalToShellNode()) : true;

    //   return canMove;
    // });
    if (nodes && (!operationalNodes || operationalNodes.length === 0)) {
      return;
    }

    this.sensing = true;
    this.scroller.scrolling(e);
    const document = this.project.currentDocument;
    if (!document) {
      return null;
    }
    const dropContainer = this.getDropContainer(e);
    const childWhitelist = dropContainer?.container?.componentMeta?.childWhitelist;
    const lockedNode = getClosestNode(dropContainer?.container as Node, (node) => node.isLocked);
    if (lockedNode) return null;
    if (
      !dropContainer ||
      (nodes && typeof childWhitelist === 'function' && !childWhitelist(operationalNodes[0]))
    ) {
      return null;
    }

    if (isLocationData(dropContainer)) {
      return this.designer.createLocation(dropContainer);
    }


    const { container, instance: containerInstance } = dropContainer;

    const edge = this.computeComponentInstanceRect(
      containerInstance,
      // container.componentMeta.rootSelector,
    );
    console.log('*********', edge);

    if (!edge) {
      return null;
    }

    const { children } = container;

    const detail: LocationChildrenDetail = {
      type: LocationDetailType.Children,
      index: 0,
      edge,
    };

    const locationData = {
      target: container as ParentalNode,
      detail,
      source: `simulator${document.id}`,
      event: e,
    };

    // if (
    //   e.dragObject &&
    //   e.dragObject.nodes &&
    //   e.dragObject.nodes.length
    //   // e.dragObject.nodes[0].componentMeta.isModal
    // ) {
    //   return this.designer.createLocation({
    //     target: document.focusNode,
    //     detail,
    //     source: `simulator${document.id}`,
    //     event: e,
    //   });
    // }

    if (!children || children.size < 1 || !edge) {
      console.log('**********12', locationData);
      return this.designer.createLocation(locationData);
    }

    let nearRect = null;
    let nearIndex = 0;
    let nearNode = null;
    let nearDistance = null;
    let minTop = null;
    let maxBottom = null;

    for (let i = 0, l = children.size; i < l; i++) {
      const node = children.get(i)!;
      const index = i;
      const instances = this.getComponentInstances(node);
      const inst = instances
        ? instances.length > 1
          ? instances.find(
            (_inst) => this.getClosestNodeInstance(_inst, container.id)?.instance === containerInstance,
          )
          : instances[0]
        : null;
      const rect = inst
        ? this.computeComponentInstanceRect(inst, undefined)
        : null;
      if (!rect) {
        continue;
      }

      const distance = isPointInRect(e as any, rect) ? 0 : distanceToRect(e as any, rect);
      if (distance === 0) {
        nearDistance = distance;
        nearNode = node;
        nearIndex = index;
        nearRect = rect;
        break;
      }

      // 标记子节点最顶
      if (minTop === null || rect.top < minTop) {
        minTop = rect.top;
      }
      // 标记子节点最底
      if (maxBottom === null || rect.bottom > maxBottom) {
        maxBottom = rect.bottom;
      }

      if (nearDistance === null || distance < nearDistance) {
        nearDistance = distance;
        nearNode = node;
        nearIndex = index;
        nearRect = rect;
      }
    }

    detail.index = nearIndex;
    if (nearNode && nearRect) {
      const el = getRectTarget(nearRect);
      const inline = el ? isChildInline(el) : false;
      const row = el ? isRowContainer(el.parentElement!) : false;
      const vertical = inline || row;

      // TODO: fix type
      const near: any = {
        node: nearNode,
        pos: 'before',
        align: vertical ? 'V' : 'H',
      };
      detail.near = near;
      if (isNearAfter(e as any, nearRect, vertical)) {
        near.pos = 'after';
        detail.index = nearIndex + 1;
      }
      if (!row && nearDistance !== 0) {
        const edgeDistance = distanceToEdge(e as any, edge);
        if (edgeDistance.distance < nearDistance!) {
          const { nearAfter } = edgeDistance;
          if (minTop == null) {
            minTop = edge.top;
          }
          if (maxBottom == null) {
            maxBottom = edge.bottom;
          }
          near.rect = new DOMRect(edge.left, minTop, edge.width, maxBottom - minTop);
          near.align = 'H';
          near.pos = nearAfter ? 'after' : 'before';
          detail.index = nearAfter ? children.size : 0;
        }
      }
    }
    return this.designer.createLocation(locationData);
  }


  /**
   * 查找合适的投放容器
   */
   getDropContainer(e: LocateEvent): DropContainer | null {
    const { target, dragObject } = e;
    const isAny = isDragAnyObject(dragObject);
    const document = this.project.currentDocument!;
    const { currentRoot } = document;
    let container: Node;
    let nodeInstance: NodeInstance<ComponentInstance> | undefined;

    if (target) {
      const ref = this.getNodeInstanceFromElement(target);
      if (ref?.node) {
        nodeInstance = ref;
        container = ref.node;
      } else if (isAny) {
        return null;
      } else {
        container = currentRoot;
      }
    } else if (isAny) {
      return null;
    } else {
      container = currentRoot;
    }
    // if (!container.isParental()) {
    const curNodeInstance = this.getNodeInstanceFromElement(container.instance.parentElement);

    if (curNodeInstance && curNodeInstance.instance) {
      container = this.currentDocument?.createParentNode(curNodeInstance.instance as HTMLDivElement, curNodeInstance?.nodeId);
    } else {
      container = container.parent || currentRoot;
    }
    // }

    // TODO: use spec container to accept specialData
    if (isAny) {
      // will return locationData
      return null;
    }

    // get common parent, avoid drop container contains by dragObject
    const drillDownExcludes = new Set<Node>();
    if (isDragNodeObject(dragObject)) {
      const { nodes } = dragObject;
      let i = nodes.length;
      let p: any = container;
      while (i-- > 0) {
        if (contains(nodes[i], p)) {
          p = nodes[i].parent;
        }
      }
      if (p !== container) {
        container = p || document.focusNode;
        drillDownExcludes.add(container);
      }
    }


    let instance: any;
    if (nodeInstance) {
      if (nodeInstance.node === container) {
        instance = nodeInstance.instance;
      } else {
        instance = this.getClosestNodeInstance(
          nodeInstance.instance as any,
          container.id,
        )?.instance;
      }
    } else {
      instance = this.getComponentInstances(container)?.[0];
    }

    let dropContainer: DropContainer = {
      container: container as any,
      instance,
    };

    let res: any;
    let upward: DropContainer | null = null;
    while (container) {
      res = this.handleAccept(dropContainer, e);
      // if (isLocationData(res)) {
      //   return res;
      // }
      if (res === true) {
        return dropContainer;
      }
      if (!res) {
        drillDownExcludes.add(container);
        if (upward) {
          dropContainer = upward;
          container = dropContainer.container;
          upward = null;
        } else if (container.parent) {
          container = container.parent;
          instance = this.getClosestNodeInstance(dropContainer.instance, container.id)?.instance;
          dropContainer = {
            container: container as ParentalNode,
            instance,
          };
        } else {
          return null;
        }
      } /* else if (res === DRILL_DOWN) {
        if (!upward) {
          container = container.parent;
          instance = this.getClosestNodeInstance(dropContainer.instance, container.id)?.instance;
          upward = {
            container,
            instance
          };
        }
        dropContainer = this.getNearByContainer(dropContainer, drillDownExcludes, e);
        if (!dropContainer) {
          dropContainer = upward;
          upward = null;
        }
      } else if (isNode(res)) {
        // TODO:
      } */
    }
    return null;
  }

  /**
   * 控制接受
   */
   handleAccept({ container, instance }: DropContainer, e: LocateEvent): boolean {
    const { dragObject } = e;
    const document = this.currentDocument!;
    const focusNode = document.focusNode;
    if (isRootNode(container)) {
      return document.checkDropTarget(focusNode, dragObject as any);
    }

    // const meta = (container as Node).componentMeta;

    // FIXME: get containerInstance for accept logic use
    // const acceptable: boolean = this.isAcceptable(container);
    // if (!meta.isContainer && !acceptable) {
    //   return false;
    // }

    // first use accept
    // if (acceptable) {
      /*
      const view: any = this.document.getView(container);
      if (view && '$accept' in view) {
        if (view.$accept === false) {
          return false;
        }
        if (view.$accept === AT_CHILD || view.$accept === '@CHILD') {
          return AT_CHILD;
        }
        if (typeof view.$accept === 'function') {
          const ret = view.$accept(container, e);
          if (ret || ret === false) {
            return ret;
          }
        }
      }
      if (proto.acceptable) {
        const ret = proto.accept(container, e);
        if (ret || ret === false) {
          return ret;
        }
      }
      */
    // }

    // check nesting
    return document.checkNesting(container, dragObject as any);
  }

  isAcceptable(/* container: ParentalNode */): boolean {
    return false;
    /*
    const meta = container.componentMeta;
    const instance: any = this.document.getView(container);
    if (instance && '$accept' in instance) {
      return true;
    }
    return meta.acceptable;
    */
  }

    postEvent(evtName: string, evtData: any): void {
        throw new Error('Method not implemented.');
    }
    rerender(): void {
        throw new Error('Method not implemented.');
    }
    purge(): void {
        throw new Error('Method not implemented.');
    }

    mountViewport(viewport: HTMLElement | null) {
      this.viewport.mount(viewport);
    }
}

function getMatched(elements: Array<Element | Text>, selector: string): Element | null {
    let firstQueried: Element | null = null;
    for (const elem of elements) {
      if (isElement(elem)) {
        if (elem.matches(selector)) {
          return elem;
        }

        if (!firstQueried) {
          firstQueried = elem.querySelector(selector);
        }
      }
    }
    return firstQueried;
}

// export const FIBER_KEY = '_reactInternalFiber';
// export function isDOMNode(node: any): node is Element | Text {
//     return node.nodeType && (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE);
// }

// function elementsFromFiber(fiber: any, elements: Array<Element | Text>) {
//     if (fiber) {
//       if (fiber.stateNode && isDOMNode(fiber.stateNode)) {
//         elements.push(fiber.stateNode);
//       } else if (fiber.child) {
//         // deep fiberNode.child
//         elementsFromFiber(fiber.child, elements);
//       }

//       if (fiber.sibling) {
//         elementsFromFiber(fiber.sibling, elements);
//       }
//     }
// }

// export function reactFindDOMNodes(elem: ReactInstance | null): Array<Element | Text> | null {
//     if (!elem) {
//       return null;
//     }
//     if (isElement(elem)) {
//       return [elem];
//     }
//     const elements: Array<Element | Text> = [];
//     const fiberNode = (elem as any)[FIBER_KEY];
//     elementsFromFiber(fiberNode?.child, elements);
//     if (elements.length > 0) return elements;
//     try {
//       return [findDOMNode(elem)];
//     } catch (e) {
//       return null;
//     }
// }

function isHTMLTag(name: string) {
  return /^[a-z]\w*$/.test(name);
}

function isPointInRect(point: CanvasPoint, rect: Rect) {
  return (
    point.canvasY >= rect.top &&
    point.canvasY <= rect.bottom &&
    point.canvasX >= rect.left &&
    point.canvasX <= rect.right
  );
}

function distanceToRect(point: CanvasPoint, rect: Rect) {
  let minX = Math.min(Math.abs(point.canvasX - rect.left), Math.abs(point.canvasX - rect.right));
  let minY = Math.min(Math.abs(point.canvasY - rect.top), Math.abs(point.canvasY - rect.bottom));
  if (point.canvasX >= rect.left && point.canvasX <= rect.right) {
    minX = 0;
  }
  if (point.canvasY >= rect.top && point.canvasY <= rect.bottom) {
    minY = 0;
  }

  return Math.sqrt(minX ** 2 + minY ** 2);
}

function distanceToEdge(point: CanvasPoint, rect: Rect) {
  const distanceTop = Math.abs(point.canvasY - rect.top);
  const distanceBottom = Math.abs(point.canvasY - rect.bottom);

  return {
    distance: Math.min(distanceTop, distanceBottom),
    nearAfter: distanceBottom < distanceTop,
  };
}

function isNearAfter(point: CanvasPoint, rect: Rect, inline: boolean) {
  if (inline) {
    return (
      Math.abs(point.canvasX - rect.left) + Math.abs(point.canvasY - rect.top) >
      Math.abs(point.canvasX - rect.right) + Math.abs(point.canvasY - rect.bottom)
    );
  }
  return Math.abs(point.canvasY - rect.top) > Math.abs(point.canvasY - rect.bottom);
}