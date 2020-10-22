import Config from '../../config';
import * as path from 'path';
import packageJson from 'package-json';
import { getAndExtractTarball } from 'ice-npm-utils';
import * as fsExtra from 'fs-extra';
import * as util from 'util';
import * as rimraf from 'rimraf';
import lowdb from '../../../lowdb';
import * as _ from 'lodash'
import {install as installDependency} from '../dependency';
import * as fileUtil from '../../../../util/fileUtil';

const rimrafAsync = util.promisify(rimraf);

export default class Plugin {
  constructor() {}

  private async downloadBlockToPage(blockSource: string) : Promise<void>{
    const componentsDir = Config.pluginPath;    
    let tarballURL: string;

    const blockDir = path.join(componentsDir, blockSource);
  

    const blockTempDir = path.join(componentsDir, `.${blockSource}.temp`);

    const packageData: any = await packageJson(blockSource);
    if (packageData) {
      tarballURL = packageData.dist.tarball;
    }

    try {
      await getAndExtractTarball(
        blockTempDir,
        tarballURL
      );

    } catch (error) {
      throw error;
    }
    const hasPlugin = fsExtra.pathExistsSync(blockDir);
    if (hasPlugin) {
      await rimrafAsync(blockDir);
    }
    await fsExtra.move(path.join(blockTempDir), blockDir);
    await rimrafAsync(blockTempDir);
    await this.installBlocksDependencies(packageData.dependencies);
    const sparrowData = await fsExtra.readJson(path.join(componentsDir, blockSource,'sparrow.json'));
    const pluginParam = {
      key: sparrowData.name,
      ...sparrowData
    }
    this.savePlugin(pluginParam);
  }


  private async installBlocksDependencies (dependencies: any) {
    const viewPackageJSON: any = await fileUtil.fetchPackage(Config.pluginPath);

    const filterDependencies: { [packageName: string]: string }[] = [];

    Object.keys(dependencies).forEach(packageName => {
      if (!viewPackageJSON.dependencies.hasOwnProperty(packageName)) {
        filterDependencies.push({
          [packageName]: dependencies[packageName],
        });
      }
    })

    return await Promise.all(filterDependencies.map(async (dependency) => {
      const [packageName, version]: [string, string] = Object.entries(dependency)[0];

      return await installDependency({
        dependencies: [{ package: packageName, version }],
        npmClient: 'npm',
        registry: 'https://registry.npmjs.org',
        isDev: false,
        projectPath: Config.pluginPath,
      });
    }));
  }

  public savePlugin(plugin: any) {
    const pluginIndex = lowdb.get('plugins').findIndex({key: plugin.key}).value();

    if (pluginIndex >= 0) {
      lowdb.get('plugins')
      .splice(pluginIndex, 1, plugin)
      .write();
    } else {
      lowdb.get('plugins')
      .push(plugin)
      .write();
    }
  }

  public getPlugin() {
    const plugins = lowdb.get('plugins')
    .value();
    return {
      list: _.clone(plugins).reverse(),
    }
  }

  public async installPlugin (data: any, ctx) {
    const {packageName, installType} = data;
    // installType 1: npm; 2: 本地
    if (installType === 1) {
      await this.downloadBlockToPage(packageName);
    } else {
      const sparrowData = await fsExtra.readJson(path.join(packageName,'sparrow.json'));
      const pluginParam = {
        key: sparrowData.name,
        path: path.join(packageName, 'dist'),
        ...sparrowData
      }
      this.savePlugin(pluginParam);
    }
    const { socket } = ctx;
    socket.emit('generator.plugin.status', {status: 0, data: {
      status: 2,
      message: 'complete',
    }});
  }
}