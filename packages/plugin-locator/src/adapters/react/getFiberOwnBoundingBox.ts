import { Fiber } from "@locator/shared";
import { SimpleDOMRect } from "../../types/types";

export function getFiberOwnBoundingBox(fiber: Fiber): SimpleDOMRect | null {
  if (fiber.stateNode && fiber.stateNode.getBoundingClientRect) {
    return fiber.stateNode.getBoundingClientRect();
  }
  return null;
}
