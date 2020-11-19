
const userHome = require('user-home');
const mkdirp = require('mkdirp');
const path = require('path');
const inquirer = require('inquirer');
const downloadServer = require('./downloadServer');
const chalk = require('chalk');
const portfinder = require('portfinder');
const ora = require('ora');
const open = require('open');
const spawn = require('cross-spawn');
const checkVersion = require('../../lib/checkVersion');
const downloadView = require('./downloadView');
const downloadPlugins = require('./downloadPlugin');
const parseArgs = require('../../lib/parseArgs');
const execa = require('execa');

const SPARROW_PATH = path.join(userHome, '.sparrow');
const SERVER_PATH = path.join(SPARROW_PATH, 'sparrow-server');
// const SERVER_PATH = path.join(__dirname, '../../../', 'sparrow-server');
const VIEW_PATH = path.join(SPARROW_PATH, 'sparrow-view');
const PLUGINS_PATH = path.join(SPARROW_PATH, 'plugins');


let commonOptions = {};
let mode = false;
let forbidupdate = false;
async function startPlugin(options = {}) {
  const pkgPath = path.join(PLUGINS_PATH, 'package.json');
  let packageConfig;
  try {
    packageConfig = require(pkgPath);
  } catch (err) {
    await downloadPlugins();
    return;
  }

  const packageName = packageConfig.name;
  const packageVersion = packageConfig.version;
  console.log(chalk.grey('sparrow view Core:', packageVersion, SERVER_PATH));

  const answers = await checkServerVersion(packageName, packageVersion);
  if (answers && answers.update) {
    await downloadPlugins();
  }

}

async function startView(options = {}) {
  const pkgPath = path.join(VIEW_PATH, 'package.json');
  let packageConfig;
  try {
    packageConfig = require(pkgPath);
  } catch (err) {
    await downloadView();
    // const answers = await inquirer.prompt([
    //   {
    //     type: 'confirm',
    //     message: `${pkgPath} 不存在，请重新下载 sparrow-server！`,
    //     name: 'download',
    //     default: true,
    //   },
    // ]);
    // if (answers.download) {
    //   await downloadView();
    // } else {
    //   console.error(err);
    //   process.exit(1);
    // }
    return;
  }

  const packageName = packageConfig.name;
  const packageVersion = packageConfig.version;
  console.log(chalk.grey('sparrow view Core:', packageVersion, SERVER_PATH));

  const answers = await checkServerVersion(packageName, packageVersion);
  if (answers && answers.update) {
    await downloadView();
  }
}

async function start(options = {}) {
  commonOptions = options;
  mode = options.mode;
  forbidupdate = options.forbidupdate || false;
  if (forbidupdate) {
    startSparrowView(options);
    await startSparrowworks(options);
    return;
  }
  await startPlugin();
  await startView();
  const pkgPath = path.join(SERVER_PATH, 'package.json');
  let packageConfig;

  try {
    // eslint-disable-next-line
    packageConfig = require(pkgPath);
  } catch(err) {
    await downloadServer();
    if (options.init === 'true') {
      console.log("Just download packages to init sparrow");
    } else {
      startSparrowView(options);
      await startSparrowworks(options);
    }
    // const answers = await inquirer.prompt([
    //   {
    //     type: 'confirm',
    //     message: `${pkgPath} 不存在，请重新下载 sparrow-server！`,
    //     name: 'download',
    //     default: true,
    //   },
    // ]);
    // if (answers.download) {
      
    // } else {
    //   console.error(err);
    //   process.exit(1);
    // }
    return;
  }

  const packageName = packageConfig.name;
  const packageVersion = packageConfig.version;
  console.log(chalk.grey('sparrow Core:', packageVersion, SERVER_PATH));

  if (options.command === 'use') {
    if (!semver.valid(options.version)) {
      console.error('Invalid version specified');
      process.exit(1);
    }
    if (packageVersion !== options.version) {
      await downloadServer(options.version);
    }
  } else {
    const answers = await checkServerVersion(packageName, packageVersion);
    if (answers && answers.update) {
      await downloadServer();
    }
  }

  if (options.init === 'true') {
    console.log("Just download packages to init sparrow");
  } else {
    startSparrowView(options);
    await startSparrowworks(options);
  }
}

function startSparrowView (options) {
  let [command, ...args] = parseArgs('vue-cli-service serve --port 9000');
  const child = execa(`node ${path.join(VIEW_PATH, 'node_modules/@vue/cli-service/bin/vue-cli-service.js')}`, args, {
    cwd: VIEW_PATH,
    stdio: ['inherit', 'pipe', 'pipe'],
    shell: true
  });

  child.stdout.on('data', buffer => {
    // console.log(buffer.toString())
    // console.log('😄访问服务：http://localhost:8000/')
  })
  child.stderr.on('data', buffer => {
    // console.log(buffer.toString());
  });

  child.on('error', error => {
    console.log(error);
  });
}


// npm run start
async function startSparrowworks(options) {
  const host = options.host || 'http://127.0.0.1';

  let port = options.port;
  if (!port) {
    try {
      port = await portfinder.getPortPromise();
    } catch (error) {
      console.log();
      console.log('Find port error');
      console.log(error);
      console.log();
      process.exit(1);
    }
  }

  const opts = { host, port };
  const url = `${opts.host}:${opts.port}`;
  const spinner = ora('Starting Sparrow');

  const env = Object.create(process.env);
  env.PORT = opts.port;
  env.NODE_ENV = 'product';

  // spinner.start();
  // 
  let [command, ...args] = parseArgs(`egg-scripts start --title=sparrow-server --framework=midway-mirror --workers=1 --sticky ${commonOptions.projectPath ? '--project=' + commonOptions.projectPath : ''}`);

  const child = execa(
    path.join(SERVER_PATH, 'node_modules/.bin/egg-scripts'),
    args,
    {
      stdio: ['pipe'],
      cwd: SERVER_PATH,
      env,
    }
  );
  let started = false;
  child.stdout.on('data', (data) => {
    if (data.toString().indexOf('started on http://127.0.0.1') !== -1) {
      spinner.stop();
      console.log();
      console.log('🚀  Start sparrow successful');
      console.log();
      console.log(`👉  Ready on ${chalk.yellow(url)}`);
      console.log();
      if (!mode) {
        open('http://localhost:8000/');
      }
      started = true;
    } else if (started) {
      console.log(data.toString());
    }
  });

  child.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  child.on('error', (error) => {
    console.log();
    console.log('😞  Start sparrow failed');
    console.log();
    console.log(error);
    process.exit(1);
  });

  process.on('SIGINT', () => {});
}

/**
 * Get the server package version
 */
async function checkServerVersion(packageName, packageVersion) {
  const result = await checkVersion(packageName, packageVersion);

  if (result) {
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        message: `A newer version of Sparrow core is available(CHANGELOG: '')`,
        name: 'update',
        default: false,
      },
    ]);

    return answers;
  }
}

module.exports = (...args) => {
  return start(...args).catch((err) => {
    console.log(err);
    process.exit(1);
  });
};
