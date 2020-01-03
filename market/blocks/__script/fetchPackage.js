const path = require('path');
const fs = require('fs-extra');
const ora = require('ora');
const utils = require('./utils');

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

  const blockNames = await utils.getBlockNames();
  
  await Promise.all(
    blockNames.map(async name => {
      const result = await fetchPackage(name);
      packages.push(result);
    })
  );
}
fetchPackages();
module.exports = fetchPackages;