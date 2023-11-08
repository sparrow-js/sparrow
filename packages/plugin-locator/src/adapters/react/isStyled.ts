import { Fiber } from "@locator/shared";

export function isStyledElement(fiber: Fiber) {
  return !!fiber._debugOwner?.elementType?.styledComponentId;
}
