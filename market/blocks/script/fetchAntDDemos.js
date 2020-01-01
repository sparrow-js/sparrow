const path = require('path');
const fs = require('fs-extra');
const ora = require('ora');
const { parseComponentType, parseCol } = require('./parse');

const spinner = ora();
const componentsDir = path.join(__dirname, '../ant-design/components');

const filterFolders = ['__tests__', '_util'];

const fetchComponent = async componentName => {
  const componentPath = path.join(componentsDir, componentName);
  const demoPath = path.join(componentPath, 'demo');
  const demoIndexCNFilePath = path.join(componentPath, 'index.zh-CN.md');
  let demoFiles = [];
  try {
    const demoIndexCNFileText = await fs.readFile(demoIndexCNFilePath, 'utf8');

    let componentType = '';
    if (componentName === 'table') {
      componentType = '表格';
    } else if (componentName === 'form') {
      componentType = '表单';
    } else {
      componentType = parseComponentType(demoIndexCNFileText);
    }

    const col = parseCol(demoIndexCNFileText);

    const fileNames = await fs.readdir(demoPath);
    demoFiles = fileNames
      .filter(fileName => path.extname(fileName) === '.md')
      .map(mdFileName => {
        const mdBaseName = path.basename(mdFileName, '.md');
        const fileName = `${componentName}-${mdBaseName}`;
        const filePath = path.join(demoPath, mdFileName);
        return {
          componentName,
          mdBaseName,
          name: fileName,
          filePath,
          componentType,
          width: 900 / col,
          height: 500 / col
        };
      });
  } catch (err) {}
  return demoFiles;
};

const fetchAntDDemos = async () => {
  spinner.start('fetch antd demos');
  const fileNames = await fs.readdir(componentsDir);
  const componentNames = fileNames.filter(fileName => {
    const filePath = path.join(componentsDir, fileName);
    return (
      !filterFolders.includes(fileName) && fs.statSync(filePath).isDirectory()
    );
  });
  let demos = [];
  await Promise.all(
    componentNames.map(async name => {
      const result = await fetchComponent(name);
      demos = demos.concat(result);
    })
  );
  spinner.succeed(`get ${demos.length} antd demos`);
  return demos;
};

module.exports = fetchAntDDemos;
