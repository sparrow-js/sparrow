import { findFiberByHtmlElement } from "./../adapters/react/findFiberByHtmlElement";
import { makeFiberId } from "./../adapters/react/makeFiberId";

export function getIdsOnPathToRoot(element: HTMLElement): {
  [id: string]: true;
} {
  const fiber = findFiberByHtmlElement(element, false);
  if (!fiber) {
    return {};
  }
  const res: {
    [id: string]: true;
  } = {};
  let parent = fiber?._debugOwner;

  while (parent) {
    res[makeFiberId(parent)] = true;
    parent = parent?._debugOwner;
  }
  return res;
}
