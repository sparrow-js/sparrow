
import IBaseBox from './IBaseBox';
import * as cheerio from 'cheerio';
import * as boxFragment from '../fragment/box';
import Config from '../../config';
import * as mkdirp from 'mkdirp';
import * as upperCamelCase from 'uppercamelcase';
import * as path from 'path';
import packageJson from 'package-json';
import { getAndExtractTarball } from 'ice-npm-utils';
import * as fsExtra from 'fs-extra';
import * as rimraf from 'rimraf';
import * as util from 'util';
import * as fileUtil from '../../../../util/fileUtil';
import {install as installDependency} from '../dependency';


const rimrafAsync = util.promisify(rimraf);

export default class Block implements IBaseBox{
  $fragment: any;
  type: string = 'block';
  name: string;
  template: string;
  public insertComponents: string[] = [];

  constructor (data: any) {
    const { boxIndex, params } = data;
    this.$fragment = cheerio.load(boxFragment.box(boxIndex), {
      xmlMode: true,
      decodeEntities: false
    });
    this.$fragment('box').append(boxFragment.block());
  }

  public getBoxFragment(index: number): any {
    this.$fragment('box').attr(':index', index);
    return this.$fragment;
  }


  private async downloadBlockToPage(blockName: string, blockSource: string) : Promise<void>{
    const componentsDir = Config.componentsDir;    
    let tarballURL: string;

    const blockDir = path.join(componentsDir, blockName);
    const blockTempDir = path.join(componentsDir, `.${blockName}.temp`);

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

    await fsExtra.move(path.join(blockTempDir, 'src'), blockDir);
    await rimrafAsync(blockTempDir);
  }

  private async installBlocksDependencies (block: any) {
    const viewPackageJSON: any = await fileUtil.fetchPackage(Config.viewBasePath);
    const dependencies = block.originData.dependencies;
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
        projectPath: Config.viewBasePath,
      });
    }));
  }
  

  public async addBlock (data: any) {
    const {key, originData} = data;
    const {componentsDir} = Config;
    await new Promise((resolve,reject) => {
      mkdirp(componentsDir, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      })
    });
    let blockName = upperCamelCase(key);
    const blockNames = await fileUtil.getBlockNames(componentsDir);
    const hasBlocks = blockNames.filter(item => {
      return (new RegExp(blockName)).test(item);
    });

    if (hasBlocks.length !== 0) {
      blockName = `${blockName}${hasBlocks.length}`;
    }


    this.name = blockName;
    this.insertComponents.push(blockName)
    
    await this.downloadBlockToPage(blockName, originData.name);
    await this.installBlocksDependencies(data);
    this.render();
  }
  
  render () {
    this.$fragment('block').empty();
    this.$fragment('block').append(`<${this.name}></${this.name}>`);
    this.setTemplate();
  }

  getSetting () {}
  
  setTemplate () {
    this.template = `<${this.name}></${this.name}>`;
  }
  
}