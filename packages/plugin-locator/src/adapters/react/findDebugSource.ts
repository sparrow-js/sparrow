import { Fiber, Source } from "@locator/shared";

export function findDebugSource(
  fiber: Fiber
): { fiber: Fiber; source: Source } | null {
  let current: Fiber | null = fiber;
  while (current) {
    if (current._debugSource) {
      return { fiber: current, source: current._debugSource };
    }
    current = current._debugOwner || null;
  }

  return null;
}
