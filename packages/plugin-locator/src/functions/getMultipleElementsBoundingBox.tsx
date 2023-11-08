import { mergeRects } from "./mergeRects";
import { SimpleDOMRect } from "../types/types";

export function getMultipleElementsBoundingBox(
  children: HTMLElement[]
): SimpleDOMRect | null {
  let composedRect: SimpleDOMRect | null = null;

  children.forEach((child) => {
    const box = child.getBoundingClientRect();
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
