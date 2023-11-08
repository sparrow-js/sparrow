import { Fiber } from "@locator/shared";
import { getAllFiberChildren } from "./getAllFiberChildren";

export function getAllWrappingParents(fiber: Fiber): Fiber[] {
  const parents: Fiber[] = [fiber];

  let currentFiber = fiber;
  while (currentFiber.return) {
    currentFiber = currentFiber.return;
    if (
      currentFiber.stateNode &&
      currentFiber.stateNode instanceof HTMLElement
    ) {
      return parents;
    }

    // if there is multiple children, it means the parent is not just wrapping this one
    const children = getAllFiberChildren(currentFiber);
    if (children.length > 1) {
      return parents;
    }
    parents.push(currentFiber);
  }
  return parents;
}
