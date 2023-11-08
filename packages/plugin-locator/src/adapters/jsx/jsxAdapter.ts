import { AdapterObject, FullElementInfo, TreeState } from '../adapterApi';
import { parseDataId } from '../../functions/parseDataId';
import { FileStorage } from '../../shared';
import { getExpressionData } from './getExpressionData';
import { getJSXComponentBoundingBox } from './getJSXComponentBoundingBox';
import { TreeNode, TreeNodeComponent } from '../../types/TreeNode';
import { Source } from '../../types/types';
import { goUpByTheTree } from '../goUpByTheTree';
import { HtmlElementTreeNode } from '../HtmlElementTreeNode';

function getLocatorData() {
  return Object.assign(window.__LOCATOR_DATA__, (window as any).SimulatorRenderer.__LOCATOR_DATA__);
}

export function getElementInfo(target: HTMLElement): FullElementInfo | null {
  const found = target.closest('[data-uid]') as HTMLElement;
  if (
    found &&
    // found instanceof HTMLElement &&
    found.dataset &&
    (found.dataset.locatorjsId || found.dataset.locatorjsStyled)
  ) {
    const dataId = found.dataset.locatorjsId;
    const styledDataId = found.dataset.locatorjsStyled;
    if (!dataId) {
      return null;
    }

    const { fileFullPath } = parseDataId(dataId);
    const [styledFileFullPath, styledId] = styledDataId
      ? parseDataId(styledDataId)
      : [null, null];

    const locatorData = getLocatorData();
    if (!locatorData) {
      return null;
    }

    const fileData: FileStorage | undefined = locatorData[fileFullPath];
    if (!fileData) {
      return null;
    }
    const styledFileData: FileStorage | undefined =
      styledFileFullPath && locatorData[styledFileFullPath];

    const expData = getExpressionData(found, fileData);
    if (!expData) {
      return null;
    }
    const styledExpData =
      styledFileData && styledFileData.styledDefinitions[Number(styledId)];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const styledLink = styledExpData && {
      filePath: styledFileData.filePath,
      projectPath: styledFileData.projectPath,
      column: (styledExpData.loc?.start.column || 0) + 1,
      line: styledExpData.loc?.start.line || 0,
    };

    // TODO move styled to separate data
    // const styled = found.dataset.locatorjsStyled
    //   ? getDataForDataId(found.dataset.locatorjsStyled)
    //   : null;

    const wrappingComponent =
      expData.wrappingComponentId !== null
        ? fileData.components[Number(expData.wrappingComponentId)]
        : null;

    return {
      thisElement: {
        box: found.getBoundingClientRect(),
        label: expData.name,
        link: {
          filePath: fileData.filePath,
          projectPath: fileData.projectPath,
          column: (expData.loc.start.column || 0) + 1,
          line: expData.loc.start.line || 0,
        },
      },
      htmlElement: found,
      parentElements: [],
      componentBox: getJSXComponentBoundingBox(
        found,
        locatorData,
        fileFullPath,
        Number(expData.wrappingComponentId),
      ),
      componentsLabels: wrappingComponent
        ? [
            {
              label: wrappingComponent.name || 'component',
              link: {
                filePath: fileData.filePath,
                projectPath: fileData.projectPath,
                column: (wrappingComponent.loc?.start.column || 0) + 1,
                line: wrappingComponent.loc?.start.line || 0,
              },
            },
          ]
        : [],
    };
  }

  // return deduplicateLabels(labels);

  return null;
}

export class JSXTreeNodeElement extends HtmlElementTreeNode {
  getSource(): Source | null {
    const dataId = this.element.dataset.locatorjsId;
    const locatorData = getLocatorData();
    if (dataId && locatorData) {
      const { fileFullPath } = parseDataId(dataId);
      const fileData: FileStorage | undefined = locatorData[fileFullPath];
      if (fileData) {
        const expData = getExpressionData(this.element, fileData);
        if (expData) {
          return {
            fileName: fileData.filePath,
            projectPath: fileData.projectPath,
            columnNumber: (expData.loc.start.column || 0) + 1,
            lineNumber: expData.loc.start.line || 0,
          };
        }
      }
    }
    return null;
  }
  getComponent(): TreeNodeComponent | null {
    const dataId = this.element.dataset.locatorjsId;
    const locatorData = window.__LOCATOR_DATA__;
    if (dataId && locatorData) {
      const { fileFullPath } = parseDataId(dataId);
      const fileData: FileStorage | undefined = locatorData[fileFullPath];
      if (fileData) {
        const expData = getExpressionData(this.element, fileData);
        if (expData && expData.wrappingComponentId !== null) {
          const component = fileData.components[expData.wrappingComponentId];
          if (component) {
            return {
              label: component.name || 'component',
              definitionLink: {
                fileName: fileData.filePath,
                projectPath: fileData.projectPath,
                columnNumber: (component.loc?.start.column || 0) + 1,
                lineNumber: component.loc?.start.line || 0,
              },
            };
          }
        }
      }
    }
    return null;
  }
}

function getTree(element: HTMLElement): TreeState | null {
  const originalRoot: TreeNode = new JSXTreeNodeElement(element);

  return goUpByTheTree(originalRoot);
}

const jsxAdapter: AdapterObject = {
  getElementInfo,
  getTree,
};

export default jsxAdapter;
