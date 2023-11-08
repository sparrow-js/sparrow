import { findDebugSource } from './findDebugSource';
import { findFiberByHtmlElement } from './findFiberByHtmlElement';
import { getFiberLabel } from './getFiberLabel';
import { getAllWrappingParents } from './getAllWrappingParents';
import { deduplicateLabels } from '../../functions/deduplicateLabels';
import { LabelData } from '../../types/LabelData';
import { getFiberOwnBoundingBox } from './getFiberOwnBoundingBox';
import { getAllParentsElementsAndRootComponent } from './getAllParentsElementsAndRootComponent';
import { isStyledElement } from './isStyled';
import { AdapterObject, FullElementInfo, TreeState } from '../adapterApi';
import { Source } from '../../shared';
import { TreeNode, TreeNodeComponent } from '../../types/TreeNode';
import { goUpByTheTree } from '../goUpByTheTree';
import { HtmlElementTreeNode } from '../HtmlElementTreeNode';

export function getElementInfo(found: HTMLElement): FullElementInfo | null {
  // Instead of labels, return this element, parent elements leading to closest component, its component labels, all wrapping components labels.
  const labels: LabelData[] = [];

  const fiber = findFiberByHtmlElement(found, false);
  if (fiber) {
    const { component, componentBox, parentElements } =
      getAllParentsElementsAndRootComponent(fiber);

    const allPotentialComponentFibers = getAllWrappingParents(component);

    // This handles a common case when the component root is basically the comopnent itself, so I want to go to usage of the component
    // TODO: whaat? why? currently I see that it adds the original styled components which is not necessary.

    // if (fiber.return && fiber.return === fiber._debugOwner) {
    //   allPotentialComponentFibers.unshift(fiber.return);
    // }

    allPotentialComponentFibers.forEach((fiber) => {
      const fiberWithSource = findDebugSource(fiber);
      if (fiberWithSource) {
        const label = getFiberLabel(
          fiberWithSource.fiber,
          fiberWithSource.source,
        );
        labels.push(label);
      }
    });

    const thisLabel = getFiberLabel(fiber, findDebugSource(fiber)?.source);

    if (isStyledElement(fiber)) {
      thisLabel.label = `${thisLabel.label} (styled)`;
    }

    return {
      thisElement: {
        box: getFiberOwnBoundingBox(fiber) || found.getBoundingClientRect(),
        ...thisLabel,
      },
      htmlElement: found,
      parentElements,
      componentBox,
      componentsLabels: deduplicateLabels(labels),
    };
  }

  return null;
}

export class ReactTreeNodeElement extends HtmlElementTreeNode {
  getSource(): Source | null {
    const fiber = findFiberByHtmlElement(this.element, false);

    if (fiber && fiber._debugSource) {
      return {
        fileName: fiber._debugSource.fileName,
        lineNumber: fiber._debugSource.lineNumber,
        columnNumber: fiber._debugSource.columnNumber,
      };
    }
    return null;
  }
  getComponent(): TreeNodeComponent | null {
    const fiber = findFiberByHtmlElement(this.element, false);
    const componentFiber = fiber?._debugOwner;

    if (componentFiber) {
      const fiberLabel = getFiberLabel(
        componentFiber,
        findDebugSource(componentFiber)?.source,
      );

      return {
        label: fiberLabel.label,
        callLink:
          (fiberLabel.link && {
            fileName: fiberLabel.link.filePath,
            lineNumber: fiberLabel.link.line,
            columnNumber: fiberLabel.link.column,
            projectPath: fiberLabel.link.projectPath,
          }) ||
          undefined,
      };
    }
    return null;
  }
}

function getTree(element: HTMLElement): TreeState | null {
  const originalRoot: TreeNode = new ReactTreeNodeElement(element);

  return goUpByTheTree(originalRoot);
}

const reactAdapter: AdapterObject = {
  getElementInfo,
  getTree,
};

export default reactAdapter;
