import { parseDataId } from '../../functions/parseDataId';

export function getDataForDataId(dataId: string) {
  const { fileFullPath, id } = parseDataId(dataId);

  const data = Object.assign(window.__LOCATOR_DATA__, (window as any).SimulatorRenderer.__LOCATOR_DATA__);
  if (!data) {
    return null;
  }

  const fileData = data[fileFullPath];
  if (!fileData) {
    return null;
  }
  const expData = fileData.expressions[Number(id)];
  if (!expData) {
    return null;
  }

  const link = {
    filePath: fileData.filePath,
    projectPath: fileData.projectPath,
    column: expData.loc.start.column || 0,
    line: expData.loc.start.line || 0,
  };

  return {
    link,
    label: expData.name,
    componentLabel: expData,
  };
}
