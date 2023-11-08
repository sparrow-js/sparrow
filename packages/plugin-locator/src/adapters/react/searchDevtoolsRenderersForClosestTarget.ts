import { findFiberByHtmlElement } from "./findFiberByHtmlElement";

export function searchDevtoolsRenderersForClosestTarget(
  target: HTMLElement
): HTMLElement | null {
  let closest: HTMLElement | null = target;
  while (closest) {
    if (findFiberByHtmlElement(closest, false)) {
      return closest;
    }
    closest = closest.parentElement;
  }

  return null;
}
