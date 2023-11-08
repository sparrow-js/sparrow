import { Fiber } from "@locator/shared";

let globalIdCounter = 0;
const globalIdMap = new WeakMap<Fiber, string>();

export function makeFiberId(fiber: Fiber) {
  if (fiber._debugID) {
    return fiber._debugID.toString();
  }
  const found = globalIdMap.get(fiber);
  if (found) {
    return found;
  } else {
    globalIdCounter++;
    const id = `fiber:${globalIdCounter}`;
    globalIdMap.set(fiber, id);
    return id;
  }
}
