import { findFiberByHtmlElement } from "../adapters/react/findFiberByHtmlElement";
import { fiberToSimple } from "../adapters/react/fiberToSimple";

export function getPathToParent(element: HTMLElement) {
  const fiber = findFiberByHtmlElement(element, false);
  if (!fiber) {
    return;
  }
  let res = fiberToSimple(fiber);
  let parent = fiber?._debugOwner;

  while (parent) {
    res = fiberToSimple(parent, [res]);
    parent = parent?._debugOwner;
  }
  return res;
}
