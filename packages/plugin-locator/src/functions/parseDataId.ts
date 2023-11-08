export function parseDataId(
  dataId: string,
): {fileFullPath: string; id: string} {
  const [fileFullPath, id] = dataId.split('::');
  if (!fileFullPath || !id) {
    throw new Error('locatorjsId is malformed');
  }
  return { fileFullPath, id };
}
