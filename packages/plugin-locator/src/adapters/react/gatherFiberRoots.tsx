/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fiber } from "@locator/shared";
import { findFiberByHtmlElement } from "./findFiberByHtmlElement";

export function gatherFiberRoots(
  parentNode: HTMLElement,
  mutable_foundFibers: Fiber[]
) {
  const nodes = parentNode.childNodes;
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node instanceof HTMLElement) {
      const fiber =
        (node as any)._reactRootContainer?._internalRoot?.current ||
        (node as any)._reactRootContainer?.current;
      if (fiber) {
        mutable_foundFibers.push(getRoot(fiber));
      } else {
        const rootFiber = findFiberByHtmlElement(node!, false);
        if (rootFiber) {
          mutable_foundFibers.push(getRoot(rootFiber));
        } else {
          gatherFiberRoots(node, mutable_foundFibers);
        }
      }
    }
  }
}

function getRoot(fiber: Fiber): Fiber {
  let thisFiber: Fiber = fiber;
  while (thisFiber.return) {
    thisFiber = thisFiber.return;
  }
  return thisFiber;
}
