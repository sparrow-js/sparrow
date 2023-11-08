import { SimpleNode } from "../types/types";
import { IdsMap } from "../components/RootTreeNode";

export function getIdsThatHaveExpandedSuccessor(
  node: SimpleNode,
  idsToShow: IdsMap
) {
  const idsThatHaveExpandedSuccessor: {
    [id: string]: true;
  } = {};

  function walkTree(node: SimpleNode): boolean {
    for (const child of node.children) {
      if (walkTree(child)) {
        idsThatHaveExpandedSuccessor[child.uniqueId] = true;
        return true;
      }
    }
    if (idsToShow[node.uniqueId]) {
      idsThatHaveExpandedSuccessor[node.uniqueId] = true;
      return true;
    }
    return false;
  }

  if (walkTree(node)) {
    idsThatHaveExpandedSuccessor[node.uniqueId] = true;
  }
  return idsThatHaveExpandedSuccessor;
}
