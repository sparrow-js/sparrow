import * as fs from 'fs-extra';
import * as path from 'path';
import { async } from 'q';

export const getBlockNames = async (blocksDir: string): Promise<string[]> => {
  const fileNames = await fs.readdir(blocksDir);
  return fileNames;
  // const blockNames = fileNames.filter(fileName => {
  //   const filePath = path.join(blocksDir, fileName);
  //   return fs.statSync(filePath).isDirectory();
  // });
  // return blockNames;
}

export const fetchPackage = async (dir: string) => {
  const packagePath = path.join(dir, 'package.json');
  if (fs.statSync(packagePath).isFile()) {
    const result = await fs.readFile(packagePath, 'utf8');
    return JSON.parse(result);
  } else {
    return {};
  }
}



// const fetchPackage = async (blockName) => {
//   const blocktPath = path.join(blocksDir, blockName);
//   const packagePath = path.join(blocktPath, 'package.json');
//   const result = await fs.readFile(packagePath, 'utf8');
//   return JSON.parse(result);
// }
