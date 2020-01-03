const devServer = require('./devServer');
const utils = require('./utils');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs-extra');

let browser = null;
let page = null;

const projectDir = process.cwd();
const devServerUrl = 'http://localhost:8080/#/';
const viewPath = path.join(projectDir, 'src/views/Home.vue');

const insertTemplate = (blockName) => {
  const template = utils.getTemplate(blockName);
  fs.writeFile(viewPath, template, 'utf8');
};

const screenshot = async (blockName, nextblockName, width, height) => {
  if (blockName) {
    const imagePath = path.join(projectDir, blockName, 'snapshot.png');
    await page.goto(devServerUrl);
  
    await page.setViewport({
      width: width + 56,
      height: height + 56
    });
    await page.screenshot({
      path: imagePath
    });
  }
 
  if (nextblockName) {
    insertTemplate(nextblockName);
  }
};


const openBrowser = async () => {
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--no-first-run',
        '--disable-setuid-sandbox',
        '--no-zygote',
        '--no-sandbox',
        '--single-process'
      ]
    });
    page = await browser.newPage();
  } catch (error) {
    console.log(error);
  }
};


async function startScreenShot () {
  await openBrowser();
  const blockNames = await utils.getBlockNames();
  blockNames.unshift('');
  devServer.run(() => {
    const blockName = blockNames.shift();
    const nextBlockName = blockNames[0];
    if(nextBlockName) {
      console.log(`${nextBlockName} start sreenshot`);
    }
    screenshot(blockName, nextBlockName, 900, 500);
    if (!nextBlockName) {
      console.log(`${nextBlockName} end sreenshot`);
      devServer.stop();
      process.exit()
    }
  })
}


startScreenShot();