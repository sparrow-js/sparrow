import { getClosestNode, canClickNode } from '@firefly/auto-utils';
import { Node } from '../../document';
import {
  ISimulatorHost,
  Component,
  NodeInstance,
  ComponentInstance,
  DropContainer,
  IViewport,
} from '../../simulator';
/**
 * 获取离当前节点最近的可点击节点
 * @param currentNode
 * @param event
 */
export const getClosestClickableNode = (
  currentNode: NodeInstance | undefined | null,
  event: MouseEvent,
) => {
  let node = {
    id: currentNode?.nodeId,
    componentName: '',
    instance: currentNode?.instance,
  };

  // while (node) {
  //   // 判断当前节点是否可点击
  //   let canClick = canClickNode(node, event);
  //   // eslint-disable-next-line no-loop-func
  //   const lockedNode = getClosestNode(node!, (n) => {
  //     // 假如当前节点就是 locked 状态，要从当前节点的父节点开始查找
  //     return !!(node?.isLocked ? n.parent?.isLocked : n.isLocked);
  //   });
  //   if (lockedNode && lockedNode.getId() !== node.getId()) {
  //     canClick = false;
  //   }
  //   if (canClick) {
  //     break;
  //   }
  //   // 对于不可点击的节点, 继续向上找
  //   node = node.parent;
  // }
  return node;
};
