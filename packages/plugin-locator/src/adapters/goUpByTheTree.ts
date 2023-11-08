import { TreeNode } from "../types/TreeNode";

export function goUpByTheTree(originalNode: TreeNode) {
  let root = originalNode;
  const expandedIds = new Set<string>();
  let current: TreeNode | null = root;

  const highlightedId = root.uniqueId;
  expandedIds.add(current.uniqueId);
  let limit = 2;
  while (current && limit > 0) {
    limit--;
    current = current.getParent();
    if (current) {
      expandedIds.add(current.uniqueId);
      root = current;
    }
  }
  return { expandedIds, highlightedId, root, originalNode };
}
