import { parseDataId } from '../../functions/parseDataId';
import { FileStorage } from '../../shared';
import { SimpleDOMRect } from '../../types/types';
import { mergeRects } from '../../functions/mergeRects';
import { getExpressionData } from './getExpressionData';

export function getJSXComponentBoundingBox(
  found: HTMLElement,
  locatorData: { [filename: string]: FileStorage },
  componentFolder: string,
  componentId: number,
): SimpleDOMRect {
  let composedBox: SimpleDOMRect = found.getBoundingClientRect();
  // Currently it works well only for components with one root element, but for components with multiple root elements we would need to track instance ids.
  function goParent(current: HTMLElement) {
    const parent = current.parentNode;
    if (!parent) {
      return;
    }
    if (parent instanceof HTMLElement) {
      if (parent.dataset.locatorjsId) {
        const { fileFullPath } = parseDataId(parent.dataset.locatorjsId);
        const fileData: FileStorage | undefined = locatorData[fileFullPath];
        if (fileData) {
          const expData = getExpressionData(parent, fileData);
          if (expData) {
            if (
              expData.wrappingComponentId === componentId &&
              componentFolder === fileFullPath
            ) {
              composedBox = mergeRects(
                composedBox,
                parent.getBoundingClientRect(),
              );
              goParent(parent);
            }
            // expData.wrappingComponentId;
          }
        }
      } else {
        // If there is no locatorjs-id, we should go to the parent, because it can be some library element
        goParent(parent);
      }
    }
  }
  goParent(found);

  return composedBox;
}
