"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter = require("events");
const trash = require("trash");
const path = require("path");
const fs = require("fs");
const util = require("util");
const shellPath = require("shell-path");
const pathKey = require("path-key");
const _ = require("lodash");
const mkdirp = require("mkdirp");
const pathExists = require("path-exists");
const arrayMove = require("array-move");
const rimraf = require("rimraf");
const ice_npm_utils_1 = require("ice-npm-utils");
const storage_1 = require("../../storage");
const getTarballURLByMaterielSource_1 = require("../../getTarballURLByMaterielSource");
const mkdirpAsync = util.promisify(mkdirp);
const accessAsync = util.promisify(fs.access);
const readdirAsync = util.promisify(fs.readdir);
const existsAsync = util.promisify(fs.exists);
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const rimrafAsync = util.promisify(rimraf);
const packageJSONFilename = 'package.json';
const abcJSONFilename = 'abc.json';
const DEFAULT_TYPE = 'react';
const DEFAULT_ADAPTER = [
    'adapter-vue-v2',
];
class Project {
    constructor(folderPath, app) {
        this.panels = [];
        this.adapter = {};
        this.name = path.basename(folderPath);
        this.path = folderPath;
        this.packagePath = path.join(this.path, packageJSONFilename);
        this.type = this.getType();
        this.language = this.getLanguage();
        this.app = app;
    }
    getType() {
        const { iceworks = {} } = this.getPackageJSON();
        const { type = DEFAULT_TYPE } = iceworks;
        return type;
    }
    getLanguage() {
        let language = 'js';
        if (fs.existsSync(path.join(this.path, 'tsconfig.json'))) {
            language = 'ts';
        }
        return language;
    }
    getPackageJSON() {
        if (!fs.existsSync(this.packagePath)) {
            const error = new Error('Project\'s package.json file not found in local environment');
            throw error;
        }
        return JSON.parse(fs.readFileSync(this.packagePath).toString());
    }
    setPackageJSON(content) {
        return fs.writeFileSync(this.packagePath, `${JSON.stringify(content, null, 2)}\n`, 'utf-8');
    }
    getEnv() {
        const PATH = pathKey();
        const env = process.env;
        const envPath = shellPath.sync().split(path.delimiter);
        envPath.unshift(path.join(this.path, 'node_modules', '.bin'));
        this.app.logger.info('env.pah:', process.env[PATH]);
        // for electron fallback
        const resourcesPath = process['resourcesPath']; // eslint-disable-line
        if (resourcesPath) {
            envPath.push(path.join(resourcesPath, 'bin'));
        }
        env[PATH] = envPath.join(path.delimiter);
        this.app.logger.info('setEnv.pah:', env[PATH]);
        // reset NODE_ENV
        // in egg.js: Generally, before deploying the application, dependencies will be installed with NODE_ENV=production or --production
        // which will exclude devDependencies because those used in development may increase the size of package released or even create pitfalls that you never expect.
        // Refs: https://github.com/eggjs/egg-scripts/blob/master/lib/cmd/start.js#L109
        env.NODE_ENV = 'development';
        return env;
    }
    interopRequire(id) {
        let mod;
        try {
            mod = require(id); // eslint-disable-line
        }
        catch (error) {
            throw error;
        }
        return mod && mod.__esModule ? mod.default : mod; // eslint-disable-line
    }
    async loadAdapter() {
        const i18n = this.app.i18n;
        // reset panels
        this.panels = [];
        const pkgContent = this.getPackageJSON();
        const adapterName = pkgContent.iceworks ? pkgContent.iceworks.adapter : null;
        if (adapterName && DEFAULT_ADAPTER.includes(adapterName)) {
            this.adapterName = adapterName;
            const getAdapter = this.interopRequire(`../../${adapterName}`);
            const adapter = await getAdapter(i18n);
            _.forEach(adapter, (config, name) => {
                const project = _.clone(this);
                delete project.adapter;
                const Module = config.module;
                if (Module) {
                    const adapterModule = new Module({ project, storage: storage_1.default, i18n });
                    const moduleName = name.toLowerCase();
                    this.adapter[moduleName] = adapterModule;
                }
                this.panels.push(Object.assign({ name }, _.omit(config, 'module')));
            });
            this.initPanels();
        }
        return this.toJSON();
    }
    async reloadAdapter() {
        const result = await this.loadAdapter();
        return result;
    }
    /**
     *  Get the panel of the current project from the cache and
     *  update the panel data according to the adapter.
     */
    initPanels() {
        this.getPanels();
        this.savePanels();
    }
    getPanels() {
        const panelSettings = storage_1.default.get('panelSettings');
        const projectPanelSettings = panelSettings.find(({ projectPath }) => projectPath === this.path);
        if (projectPanelSettings) {
            const { panels } = projectPanelSettings;
            panels.forEach(({ name: settingName, isAvailable }, index) => {
                const panel = this.panels.find(({ name }) => settingName === name);
                if (panel) {
                    panel.isAvailable = isAvailable;
                    panel.index = index;
                }
            });
            this.panels = _.orderBy(this.panels, 'index');
        }
    }
    savePanels() {
        const panelSettings = storage_1.default.get('panelSettings');
        const projectPanelSettings = panelSettings.find(({ projectPath }) => projectPath === this.path);
        const panels = this.panels.map(({ name, isAvailable }) => ({ name, isAvailable }));
        if (projectPanelSettings) {
            projectPanelSettings.panels = panels;
        }
        else {
            panelSettings.push({
                projectPath: this.path,
                panels,
            });
        }
        storage_1.default.set('panelSettings', panelSettings);
    }
    setPanel(params) {
        const { name, isAvailable } = params;
        const panel = this.panels.find(({ name: settingName }) => settingName === name);
        if (panel) {
            panel.isAvailable = isAvailable;
            this.savePanels();
        }
        return this.panels;
    }
    sortPanels(params) {
        const { oldIndex, newIndex } = params;
        this.panels = arrayMove(this.panels, oldIndex, newIndex);
        this.savePanels();
        return this.panels;
    }
    toJSON() {
        const { name, path, panels, type, adapterName } = this;
        return {
            name,
            adapterName,
            path,
            type,
            panels,
        };
    }
}
class ProjectManager extends EventEmitter {
    constructor(app) {
        super();
        this.app = app;
    }
    async refresh() {
        const projects = storage_1.default.get('projects').map(projectPath => {
            if (fs.existsSync(projectPath) && fs.existsSync(`${projectPath}/package.json`)) {
                return { projectPath, exists: true };
            }
            return { projectPath, exists: false };
        });
        this.projects = await this.createProjects(projects.filter(({ exists }) => exists));
        // Delete projects that do not exist in local environment
        projects.forEach(({ projectPath, exists }) => {
            if (!exists) {
                this.deleteProject({ projectPath, deleteFiles: false });
            }
        });
    }
    async createProjects(projects) {
        return await Promise.all(projects.map(async ({ projectPath }) => {
            const project = new Project(projectPath, this.app);
            await project.loadAdapter();
            return project;
        }));
    }
    async ready() {
        await this.app.i18n.readLocales();
        this.refresh();
    }
    /**
     * Get all project
     */
    getProjects() {
        return this.projects;
    }
    /**
     * Get the project in the project list
     */
    async getProject(path) {
        const project = this.projects.find((currentItem) => currentItem.path === path);
        if (project) {
            return project;
        }
    }
    /**
     * Get current project
     */
    async getCurrent() {
        const projectPath = storage_1.default.get('project');
        if (!fs.existsSync(projectPath)) {
            const error = new Error('Project not found in local environment');
            throw error;
        }
        const project = await this.getProject(projectPath);
        return project;
    }
    /**
     * Add a project to project list
     */
    async addProject(projectPath) {
        const projects = storage_1.default.get('projects');
        if (projects.indexOf(projectPath) === -1) {
            const project = new Project(projectPath, this.app);
            await project.loadAdapter();
            this.projects.push(project);
            projects.push(projectPath);
            storage_1.default.set('projects', projects);
        }
        storage_1.default.set('project', projectPath);
    }
    /**
     * Create folder for project
     */
    async createProjectFolder(params) {
        const { path: targetPath, forceCover } = params;
        if (!await pathExists(targetPath)) {
            await mkdirpAsync(targetPath);
        }
        // check read and write
        try {
            await accessAsync(targetPath, fs.constants.R_OK | fs.constants.W_OK); // eslint-disable-line
        }
        catch (error) {
            error.message = '当前路径没有读写权限，请更换项目路径';
            throw error;
        }
        // check folder files
        const files = await readdirAsync(targetPath);
        if (files.length) {
            const exited = await existsAsync(path.join(targetPath, packageJSONFilename));
            if (!exited) {
                if (!forceCover) {
                    const error = new Error('当前文件夹不为空，不允许创建项目');
                    error.code = 'HAS_FILES';
                    throw error;
                }
            }
            else {
                const error = new Error('请导入该项目');
                error.code = 'LEGAL_PROJECT';
                throw error;
            }
        }
    }
    /**
     * Generate abc.json for alibaba user
     */
    async generateAbcFile(projectDir, iceScriptsVersion) {
        // '^2.0.0' -> true
        const latestVersion = /^\^2\./.test(iceScriptsVersion);
        const abcData = {
            type: latestVersion ? 'ice-scripts' : 'iceworks',
            builder: latestVersion ? '@ali/builder-ice-scripts' : '@ali/builder-iceworks',
        };
        const abcJsonPath = path.join(projectDir, abcJSONFilename);
        await writeFileAsync(abcJsonPath, JSON.stringify(abcData, null, 2));
    }
    /**
     * Generate project
     */
    async generateProject(params) {
        const { path: targetPath, scaffold } = params;
        const tarballURL = await getTarballURLByMaterielSource_1.default(scaffold.source);
        await ice_npm_utils_1.getAndExtractTarball(targetPath, tarballURL);
    }
    /**
     * Format project
     */
    async formatProject(params) {
        const { path: targetPath, name } = params;
        await rimrafAsync(path.join(targetPath, 'build'));
        // rewrite pakcage.json
        const packageJSONPath = path.join(targetPath, packageJSONFilename);
        const packageJSON = JSON.parse((await readFileAsync(packageJSONPath)).toString());
        delete packageJSON.files;
        delete packageJSON.publishConfig;
        if (packageJSON.buildConfig) {
            delete packageJSON.buildConfig.output;
            delete packageJSON.buildConfig.localization;
        }
        delete packageJSON.scaffoldConfig;
        delete packageJSON.homepage;
        delete packageJSON.scripts.screenshot;
        delete packageJSON.scripts.prepublishOnly;
        packageJSON.title = name;
        await writeFileAsync(packageJSONPath, `${JSON.stringify(packageJSON, null, 2)}\n`, 'utf-8');
        const isAlibaba = await ice_npm_utils_1.checkAliInternal();
        if (isAlibaba) {
            await this.generateAbcFile(targetPath, packageJSON.devDependencies['ice-scripts']);
        }
    }
    /**
     * Create a project by scaffold
     *
     * TODO create a project by custom scaffold
     */
    async createProject(params) {
        const { appId, changeId, path: targetPath } = params;
        await this.createProjectFolder(params);
        if (appId) {
            const generate = require('@ali/stark-biz-generator'); // eslint-disable-line
            await generate({ appId, changeId, targetDir: targetPath });
        }
        else {
            await this.generateProject(params);
        }
        await this.formatProject(params);
        await this.addProject(targetPath);
    }
    /**
     * Delete a project in project list
     */
    async deleteProject(params) {
        const { projectPath, deleteFiles } = params;
        this.projects = this.projects.filter(({ path }) => path !== projectPath);
        // remove project at storage
        const newProjects = storage_1.default.get('projects').filter((path) => path !== projectPath);
        storage_1.default.set('projects', newProjects);
        // remove project panel settings
        const newPanelSettings = storage_1.default.get('panelSettings').filter(({ projectPath: project }) => project !== projectPath);
        storage_1.default.set('panelSettings', newPanelSettings);
        // delete project files
        if (deleteFiles) {
            try {
                await trash(projectPath);
            }
            catch (error) {
                // TODO
            }
        }
        // reset project if deleted current project
        const currentProjectPath = storage_1.default.get('project');
        if (currentProjectPath === projectPath) {
            storage_1.default.set('project', newProjects[0] || '');
        }
    }
    /**
     * Set current project
     */
    async setCurrent(path) {
        storage_1.default.set('project', path);
        const project = await this.getProject(path);
        return project;
    }
}
exports.default = (app) => {
    app.beforeStart(async () => {
        app.projectManager = new ProjectManager({ i18n: app.i18n, logger: app.logger });
        await app.projectManager.ready();
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9wbHVnaW4vcHJvamVjdC1tYW5hZ2VyL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF1QztBQUN2QywrQkFBK0I7QUFDL0IsNkJBQTZCO0FBQzdCLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFDN0Isd0NBQXdDO0FBQ3hDLG9DQUFvQztBQUNwQyw0QkFBNEI7QUFDNUIsaUNBQWlDO0FBQ2pDLDBDQUEwQztBQUMxQyx3Q0FBd0M7QUFDeEMsaUNBQWlDO0FBQ2pDLGlEQUF1RTtBQUN2RSwyQ0FBb0M7QUFFcEMsdUZBQWdGO0FBRWhGLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDM0MsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDOUMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDaEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDOUMsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDbEQsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDcEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUUzQyxNQUFNLG1CQUFtQixHQUFHLGNBQWMsQ0FBQztBQUMzQyxNQUFNLGVBQWUsR0FBRyxVQUFVLENBQUM7QUFDbkMsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDO0FBQzdCLE1BQU0sZUFBZSxHQUFHO0lBQ3RCLGdCQUFnQjtJ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