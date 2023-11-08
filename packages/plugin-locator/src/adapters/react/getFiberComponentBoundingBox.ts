import { getFiberOwnBoundingBox } from "./getFiberOwnBoundingBox";
import { Fiber } from "@locator/shared";
import { getAllFiberChildren } from "./getAllFiberChildren";
import { mergeRects } from "../../functions/mergeRects";
import { SimpleDOMRect } from "../../types/types";

const MAX_LEVEL = 6;
export function getFiberComponentBoundingBox(fiber: Fiber, level = 0) {
  const children = getAllFiberChildren(fiber);
  let composedRect: SimpleDOMRect | undefined;
  children.forEach((child) => {
    let box = getFiberOwnBoundingBox(child);
    if (!box && level < MAX_LEVEL) {
      box = getFiberComponentBoundingBox(child, level + 1) || null;
    }
    if (!box) {
      return;
    }
    if (box.width <= 0 || box.height <= 0) {
      // ignore zero-sized rects
      return;
    }
    if (composedRect) {
      composedRect = mergeRects(composedRect, box);
    } else {
      composedRect = box;
    }
  });
  return composedRect;
}
