const fs = require('fs-extra');
const path = require('path');
const ora = require('ora');
const prettier = require('prettier');
const { winPath } = require('umi-utils');

const {
  parseJSX,
  parseStyle,
  parseTitle,
  parseDesc,
  parseIsDebug
} = require('./parse');
const fetchAntDDemos = require('./fetchAntDDemos');
const { screenshot, openBrowser, closeBrowser } = require('./screenshot');
const topList = require('./top');

require('events').EventEmitter.defaultMaxListeners = 0;

const blockTemplateDir = winPath(
  path.join(__dirname, '../assets/block-template')
);
const rootDir = winPath(path.join(__dirname, '..'));
const continueFilePath = winPath(path.join(__dirname, '../continue.json'));
const spinner = ora();
let historyList = [];
const DEBUG_COUNT = 0;
const isWin = process.platform === 'win32';

const modifyPackageInfo = async (blockDir, name, description) => {
  const pkgFilePath = winPath(path.join(blockDir, 'package.json'));
  const pkg = require(pkgFilePath);
  const json = {
    ...pkg,
    name: `@umi-block/${name}`,
    description
  };
  const jsonStr = prettier.format(JSON.stringify(json), { parser: 'json' });
  await fs.outputFile(pkgFilePath, jsonStr);
};

const generateBlock = async demoWithText => {
  const { name, text, componentName, mdBaseName, width, height } = demoWithText;

  const blockDir = winPath(path.join(rootDir, name));

  try {
    await fs.remove(blockDir);
  } catch (err) {
    console.log(err);
  }

  try {
    await fs.ensureDir(blockDir);
  } catch (err) {
    console.log(err);
  }

  try {
    await fs.copy(`${blockTemplateDir}`, `${blockDir}`);
  } catch (err) {
    console.log(err);
  }

  const id = `components-${componentName}-demo-${mdBaseName}`;
  const jsxText = parseJSX(text, id);
  const cssText = parseStyle(text, componentName);
  const indexTSXPath = path.join(blockDir, 'src/index.tsx');
  const indexLessPath = path.join(blockDir, 'src/index.less');
  try {
    await fs.outputFile(indexTSXPath, jsxText);
    if (cssText !== null) {
      await fs.outputFile(indexLessPath, cssText);
    }
  } catch (err) {
    console.log(err);
  }

  const description = parseDesc(text);
  await modifyPackageInfo(blockDir, name, description);

  await screenshot(name, blockDir, rootDir, width, height);
};

const generateBlocks = async (demosWithText, needContinue) => {
  for (let index = 0; index < demosWithText.length; index++) {
    const demoWithText = demosWithText[index];
    const { name } = demoWithText;
    if (needContinue && historyList.indexOf(name) !== -1) {
      continue;
    }

    const current = historyList.length + 1;
    const total = demosWithText.length;
    spinner.start(`[${current}/${total}] generate block ${name}`);

    await generateBlock(demoWithText);
    historyList.push(name);
    await fs.writeJSON(continueFilePath, historyList);
  }
  const total = demosWithText.length;
  spinner.succeed(`${total} blocks generated`);
};

const generateBlockList = async demosWithText => {
  spinner.start('generate umi-block.json');
  let blockList = [];
  for (let index = 0; index < demosWithText.length; index++) {
    const demoWithText = demosWithText[index];
    const {
      name,
      componentName,
      mdBaseName,
      text,
      componentType
    } = demoWithText;
    const description = parseDesc(text);
    const demoTitle = parseTitle(text);
    const title = `${componentName}-${demoTitle}`;
    const img = `https://raw.githubusercontent.com/ant-design/ant-design-blocks/master/${name}/snapshot.png`;
    const previewUrl = `https://ant.design/components/${componentName}-cn/#components-${componentName}-demo-${mdBaseName}`;
    const url = `https://github.com/ant-design/ant-design-blocks/tree/master/${name}`;
    const tags = [componentType];
    blockList.push({
      title,
      value: name,
      key: name,
      description,
      url,
      type: 'block',
      path: name,
      isPage: false,
      defaultPath: `/${name}`,
      img,
      tags,
      name: title,
      previewUrl,
      features: ['antd']
    });
  }

  const topBlocks = [];
  const restBlocks = [];
  blockList.forEach(block => {
    const pos = topList.indexOf(block.key);
    if (pos !== -1) {
      topBlocks[pos] = block;
    } else {
      restBlocks.push(block);
    }
  });

  const umiBlockJSON = { blocks: topBlocks.concat(restBlocks) };
  const blockListFilePath = path.join(rootDir, 'umi-block.json');
  await fs.writeJSON(blockListFilePath, umiBlockJSON);
  spinner.succeed();
};

const main = async () => {
  const needContinue = process.argv[2] === '-c';

  if (needContinue) {
    historyList = await fs.readJSON(continueFilePath, 'utf8');
  } else {
    await fs.writeJSON(continueFilePath, historyList);
  }

  const demos = await fetchAntDDemos();

  if (demos.length <= 0) {
    console.error(
      'antd demos not found, please check ant-design submodule is existed!'
    );
    return;
  }

  let demosWithText = demos
    .map(demo => {
      const text = fs.readFileSync(
        isWin ? winPath(demo.filePath) : demo.filePath,
        'utf8'
      );
      return {
        ...demo,
        text
      };
    })
    .filter(demo => !parseIsDebug(demo.text))
    .filter(demo => demo.componentType !== '废弃');

  if (DEBUG_COUNT !== 0) {
    demosWithText = demosWithText.slice(0, DEBUG_COUNT);
  }

  console.log(`will generate ${demosWithText.length} blocks`);
  await openBrowser();

  await generateBlocks(demosWithText, needContinue);

  await generateBlockList(demosWithText);

  await closeBrowser();
};

main();
