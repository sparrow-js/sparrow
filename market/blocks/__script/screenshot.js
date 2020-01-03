const devServer = require('./devServer');
const utils = require('./utils');
const puppeteer = require('puppeteer');
const path = require('path');

let browser = null;
let page = null;

const projectDir = process.cwd();
const devServerUrl = 'http://localhost:8080/#/';
const viewPath = poth.join(projectDir, 'src/views/Home.vue');

const insertTemplate = (blockName) => {
  const template = utils.getTemplate(blockName);
  fsExtra.writeFile(viewPath, template, 'utf8');
};

const screenshot = async (blockName, nextblockName, width, height) => {
  if (blockName) {
    const imagePath = path.join(projectDir, blockName, 'snapshot.png');
    await page.goto(devServerUrl);
    await page.evaluate(() => {
      document.body.style.padding = '24px';
      const root = document.getElementById('root');
      root.style.border = '1px solid #ddd';
      root.style.height = '100%';
      root.style.width = '100%';
      root.style.padding = '24px';
      root.style.position = 'relative';
      root.style.transform = 'scale(1, 1)';
    });
  
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
  openBrowser();
  const blockNames = await utils.getBlockNames();
  blockNames.unshift('');
  devServer.run().then(() => {
    screenshot(blockNames.shift, blockNames[0]);
  });
}

startScreenShot();
