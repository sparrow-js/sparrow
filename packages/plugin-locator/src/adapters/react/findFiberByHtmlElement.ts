import { Fiber, Renderer } from "@locator/shared";
import { findDebugSource } from "./findDebugSource";

export function findFiberByHtmlElement(
  target: HTMLElement,
  shouldHaveDebugSource: boolean
): Fiber | null {
  const renderers = window.__REACT_DEVTOOLS_GLOBAL_HOOK__?.renderers;
  // console.log("RENDERERS: ", renderers);
  const renderersValues = renderers?.values();
  if (renderersValues) {
    for (const renderer of Array.from(renderersValues) as Renderer[]) {
      if (renderer.findFiberByHostInstance) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const found = renderer.findFiberByHostInstance(target as any);
        if (found) {
          if (shouldHaveDebugSource) {
            return findDebugSource(found)?.fiber || null;
          } else {
            return found;
          }
        }
      }
    }
  }
  return null;
}
