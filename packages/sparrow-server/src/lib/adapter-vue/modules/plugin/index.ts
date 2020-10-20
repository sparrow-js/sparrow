import Config from '../../config';
import * as path from 'path';
import packageJson from 'package-json';
import { getAndExtractTarball } from 'ice-npm-utils';
import * as fsExtra from 'fs-extra';
import * as util from 'util';
import * as rimraf from 'rimraf';
import lowdb from '../../../lowdb';
import * as _ from 'lodash'


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
    await fsExtra.move(path.join(blockTempDir), blockDir);
    await rimrafAsync(blockTempDir);
    const sparrowData = await fsExtra.readJson(path.join(componentsDir, blockSource,'sparrow.json'));
    const pluginParam = {
      key: sparrowData.name,
      ...sparrowData
    }
    this.savePlugin(pluginParam);
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
    await this.downloadBlockToPage(data.packageName);
    const { socket } = ctx;
    socket.emit('generator.plugin.status', {status: 0, data: {
      status: 2,
      message: 'complete',
    }});
  }
}