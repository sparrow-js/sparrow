import { Fiber } from "@locator/shared";
import { getUsableName } from "../../functions/getUsableName";
import { mergeRects } from "../../functions/mergeRects";
import { SimpleDOMRect } from "../../types/types";
import { ElementInfo } from "../adapterApi";
import { getFiberComponentBoundingBox } from "./getFiberComponentBoundingBox";
import { isStyledElement } from "./isStyled";

export function getAllParentsElementsAndRootComponent(fiber: Fiber): {
  component: Fiber;
  componentBox: SimpleDOMRect;
  parentElements: ElementInfo[];
} {
  const parentElements: ElementInfo[] = [];
  const deepestElement = fiber.stateNode;
  if (!deepestElement || !(deepestElement instanceof HTMLElement)) {
    throw new Error(
      "This functions works only for Fibres with HTMLElement stateNode"
    );
  }
  let componentBox: SimpleDOMRect = deepestElement.getBoundingClientRect();

  // For styled-components we rather use parent element
  let currentFiber =
    isStyledElement(fiber) && fiber._debugOwner ? fiber._debugOwner : fiber;
  while (currentFiber._debugOwner || currentFiber.return) {
    currentFiber = currentFiber._debugOwner || currentFiber.return!;
    const currentElement = currentFiber.stateNode;
    if (!currentElement || !(currentElement instanceof HTMLElement)) {
      return {
        component: currentFiber,
        parentElements,
        componentBox:
          getFiberComponentBoundingBox(currentFiber) || componentBox,
      };
    }

    const usableName = getUsableName(currentFiber);

    componentBox = mergeRects(
      componentBox,
      currentElement.getBoundingClientRect()
    );

    parentElements.push({
      box: currentElement.getBoundingClientRect(),
      label: usableName,
      link: null,
    });
  }
  throw new Error("Could not find root component");
}
