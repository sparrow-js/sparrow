const path = require('path');
const fs = require('fs-extra');
const ora = require('ora');


const spinner = ora();

const blocksDir = path.join(__dirname, '..');

const packages = [];

filterFolders = [
  'src',
  'node_modules',
  'public',
  '__script',
  '_script',
  'script'
];
const fetchPackage = async (blockName) => {
  const blocktPath = path.join(blocksDir, blockName);
  const packagePath = path.join(blocktPath, 'package.json');
  const result = await fs.readFile(packagePath, 'utf8');
  return JSON.parse(result);
}
const fetchPackages = async () => {
  spinner.start('fetch antd demos');
  const fileNames = await fs.readdir(blocksDir);

  const blockNames = fileNames.filter(fileName => {
    const filePath = path.join(blocksDir, fileName);
    return !filterFolders.includes(fileName) && fs.statSync(filePath).isDirectory();
  });
  
  await Promise.all(
    blockNames.map(async name => {
      const result = await fetchPackage(name);
      packages.push(result);
    })
  );
  console.log(packages);
  console.log('*************')
}
fetchPackages();
module.exports = fetchPackages;