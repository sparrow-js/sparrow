"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const fsExtra = require("fs-extra");
const util = require("util");
const ejs = require("ejs");
const prettier = require("prettier");
const rimraf = require("rimraf");
const _ = require("lodash");
const mkdirp = require("mkdirp");
const upperCamelCase = require("uppercamelcase");
const uniqBy = require("lodash.uniqby");
const ice_npm_utils_1 = require("ice-npm-utils");
const scanDirectory_1 = require("../../../scanDirectory");
const getNpmClient_1 = require("../../../getNpmClient");
const goldlog_1 = require("../../../goldlog");
const getIceVersion_1 = require("../../utils/getIceVersion");
const getTarballURLByMaterielSource_1 = require("../../../getTarballURLByMaterielSource");
const dependency_1 = require("../dependency");
const rimrafAsync = util.promisify(rimraf);
const mkdirpAsync = util.promisify(mkdirp);
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
const lstatAsync = util.promisify(fs.lstat);
const loadTemplate = async (fileName, filePath) => {
    const fileStr = await readFileAsync(filePath, 'utf-8');
    const compile = ejs.compile(fileStr);
    return {
        compile,
        filePath,
        fileName,
    };
};
class Page {
    constructor(params) {
        this.componentDirName = 'components';
        const { project, storage } = params;
        this.project = project;
        this.storage = storage;
        this.path = path.join(this.project.path, 'src', 'pages');
        this.templateFileName = 'template.jsx';
        this.templateFilePath = path.join(__dirname, `${this.templateFileName}.ejs`);
        this.prettierParseType = 'babel';
    }
    async scanPages(dirPath) {
        const subDirectories = await scanDirectory_1.default(dirPath);
        const pages = await Promise.all(subDirectories.map(async (dir) => {
            const pagePath = path.join(dirPath, dir);
            const { atime, birthtime, ctime, mtime } = await lstatAsync(pagePath);
            const pageName = path.basename(dir);
            const blocks = await this.getBlocks(pageName);
            return {
                name: path.basename(pagePath),
                path: pagePath,
                atime,
                birthtime,
                ctime,
                mtime,
                blocks,
            };
        }));
        return pages;
    }
    async downloadBlocksToPage(blocks, pageName, ctx) {
        return await Promise.all(blocks.map(async (block) => await this.downloadBlockToPage(block, pageName, ctx)));
    }
    async installBlocksDependencies(blocks, ctx) {
        const projectPackageJSON = this.project.getPackageJSON();
        // get all dependencies
        const blocksDependencies = {};
        blocks.forEach(({ dependencies }) => Object.assign(blocksDependencies, dependencies));
        // filter dependencies if already in project
        const filterDependencies = [];
        Object.keys(blocksDependencies).forEach((packageName) => {
            if (!projectPackageJSON.dependencies.hasOwnProperty(packageName)) {
                filterDependencies.push({
                    [packageName]: blocksDependencies[packageName],
                });
            }
        });
        return await Promise.all(filterDependencies.map(async (dependency) => {
            const [packageName, version] = Object.entries(dependency)[0];
            const [npmClient, registry] = await getNpmClient_1.default();
            return await dependency_1.install({
                dependencies: [{ package: packageName, version }],
                npmClient,
                registry,
                isDev: false,
                project: this.project,
                namespace: 'page',
                ctx,
            });
        }));
    }
    async downloadBlockToPage(block, pageName, ctx) {
        const blockSourceNpm = block.source.npm;
        const { i18n, logger } = ctx;
        const projectPackageJSON = this.project.getPackageJSON();
        const componentsDir = path.join(this.path, pageName, this.componentDirName);
        await mkdirpAsync(componentsDir);
        await goldlog_1.default({
            namespace: 'adapter',
            module: 'page',
            action: 'downloadBlock',
            data: {
                block: blockSourceNpm,
            },
        });
        const iceVersion = getIceVersion_1.default(projectPackageJSON);
        const blockName = this.generateBlockName(block);
        let tarballURL;
        try {
            tarballURL = await getTarballURLByMaterielSource_1.default(block.source, iceVersion);
        }
        catch (error) {
            logger.error(error);
            error.message = `${i18n.format('baseAdapter.page.download.requestError', { blockSourceNpm })}，可手动克隆 ${block.repository}`;
            throw error;
        }
        const blockDir = path.join(componentsDir, blockName);
        const blockTempDir = path.join(componentsDir, `.${blockName}.temp`);
        try {
            await ice_npm_utils_1.getAndExtractTarball(blockTempDir, tarballURL);
        }
        catch (error) {
            logger.error('getAndExtractTarball got error!');
            error.message = i18n.format('baseAdapter.page.download.tarError', { blockName, tarballURL });
            if (error.code === 'ETIMEDOUT' || error.code === 'ESOCKETTIMEDOUT') {
                error.message = i18n.format('baseAdapter.page.download.tarTimeOut', { blockName, tarballURL });
            }
            throw error;
        }
        await fsExtra.move(path.join(blockTempDir, 'src'), blockDir);
        await rimrafAsync(blockTempDir);
    }
    generateBlockName(block) {
        return upperCamelCase(block.name);
    }
    checkBlocksName(blocks) {
        return uniqBy(blocks.map((block) => ({ name: this.generateBlockName(block) })), 'name').length !== blocks.length;
    }
    async getAll() {
        const pages = await this.scanPages(this.path);
        return _.orderBy(pages, 'name', 'asc');
    }
    async create(page, ctx) {
        const { name, blocks } = page;
        const { socket, i18n, logger } = ctx;
        // create page dir
        socket.emit('adapter.page.create.status', { text: i18n.format('baseAdapter.page.create.createMenu'), percent: 10 });
        const pageName = upperCamelCase(name);
        const pageDir = path.join(this.path, pageName);
        await mkdirpAsync(pageDir);
        if (fs.readdirSync(pageDir).length > 0) {
            const error = new Error(`${name} 页面已存在，不允许覆盖。`);
            error.code = 'DESTDIR_EXISTS_OVERRIDE';
            throw error;
        }
        // add blocks
        socket.emit('adapter.page.create.status', { text: i18n.format('baseAdapter.page.create.download'), percent: 40 });
        try {
            await this.addBlocks({ blocks, name: pageName }, ctx);
        }
        catch (error) {
            logger.error('addBlocks got error!');
            await this.delete({ name: pageName });
            throw error;
        }
        // create page file
        socket.emit('adapter.page.create.status', { text: i18n.format('baseAdapter.page.create.createFile'), percent: 80 });
        const template = await loadTemplate(this.templateFileName, this.templateFilePath);
        const fileContent = template.compile({
            blocks: blocks.map((block) => {
                const blockName = this.generateBlockName(block);
                return Object.assign(Object.assign({}, block), { className: blockName, relativePath: `./${this.componentDirName}/${blockName}` });
            }),
            className: pageName,
            pageName,
        });
        const fileName = template.fileName
            .replace(/template/g, 'index')
            .replace(/\.ejs$/g, '');
        const dist = path.join(pageDir, fileName);
        const rendered = prettier.format(fileContent, { singleQuote: true, trailingComma: 'es5', parser: this.prettierParseType });
        await writeFileAsync(dist, rendered, 'utf-8');
        return pageName;
    }
    async delete(params) {
        const { name } = params;
        await rimrafAsync(path.join(this.path, name));
    }
    async getBlocks(name) {
        const pagePath = path.join(this.path, name);
        const blocksPath = path.join(pagePath, this.componentDirName);
        let blockDirectroies = [];
        try {
            blockDirectroies = await scanDirectory_1.default(blocksPath);
        }
        catch (err) {
            // ignore error
        }
        const blocks = blockDirectroies.map((blockDir) => {
            return {
                name: blockDir,
                path: path.join(blocksPath, blockDir),
            };
        });
        return blocks;
    }
    async addBlocks(params, ctx) {
        const { blocks, name } = params;
        const { i18n } = ctx;
        const existBlocks = await this.getBlocks(name);
        if (this.checkBlocksName(existBlocks.concat(blocks))) {
            throw new Error(i18n.format('baseAdapter.page.blocks.exist'));
        }
        await this.downloadBlocksToPage(blocks, name, ctx);
        await this.installBlocksDependencies(blocks, ctx);
    }
    async addBlock(params, ctx) {
        const { block, name } = params;
        await this.downloadBlockToPage(block, name, ctx);
        await this.installBlocksDependencies([block], ctx);
    }
}
exports.default = Page;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2FkYXB0ZXIvbW9kdWxlcy9wYWdlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTZCO0FBQzdCLHlCQUF5QjtBQUN6QixvQ0FBb0M7QUFDcEMsNkJBQTZCO0FBQzdCLDJCQUEyQjtBQUMzQixxQ0FBcUM7QUFDckMsaUNBQWlDO0FBQ2pDLDRCQUE0QjtBQUM1QixpQ0FBaUM7QUFDakMsaURBQWlEO0FBQ2pELHdDQUF3QztBQUN4QyxpREFBcUQ7QUFDckQsMERBQW1EO0FBQ25ELHdEQUFpRDtBQUNqRCw4Q0FBdUM7QUFDdkMsNkRBQXNEO0FBQ3RELDBGQUFtRjtBQUNuRiw4Q0FBNkQ7QUFHN0QsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzQyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNDLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3BELE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2xELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRTVDLE1BQU0sWUFBWSxHQUFHLEtBQUssRUFBRSxRQUFnQixFQUFFLFFBQWdCLEVBQUUsRUFBRTtJQUNoRSxNQUFNLE9BQU8sR0FBRyxNQUFNLGFBQWEsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdkQsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQyxPQUFPO1FBQ0wsT0FBTztRQUNQLFFBQVE7UUFDUixRQUFRO0tB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