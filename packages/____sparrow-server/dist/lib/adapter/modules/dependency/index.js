"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fsExtra = require("fs-extra");
const util = require("util");
const rimraf = require("rimraf");
const execa = require("execa");
// import * as latestVersion from 'latest-version';
const getNpmClient_1 = require("../../../getNpmClient");
const rimrafAsync = util.promisify(rimraf);
exports.install = async (params) => {
    const { dependencies, npmClient, registry, isDev, project, namespace, ctx } = params;
    const { socket, i18n, logger } = ctx;
    logger.info('dependencies', dependencies);
    socket.emit(`adapter.${namespace}.install.data`, { chunk: i18n.format('baseAdapter.dependency.reset.startInstall') });
    const args = ['install', '--loglevel', 'silly', '--no-package-lock', isDev ? '---save-dev' : '--save']
        .concat(dependencies.map(({ package: packageName, version }) => `${packageName}@${version}`))
        .concat(registry ? ['--registry', registry] : []);
    const childProcess = execa(npmClient, args, {
        cwd: project.path,
        env: project.getEnv(),
        stdio: ['inherit', 'pipe', 'pipe'],
    });
    const listenFunc = (buffer) => {
        const chunk = buffer.toString();
        logger.info(`${namespace}.install.data:`, chunk);
        socket.emit(`adapter.${namespace}.install.data`, {
            chunk,
            isStdout: true,
        });
    };
    childProcess.stdout.on('data', listenFunc);
    childProcess.stderr.on('data', listenFunc);
    childProcess.on('error', (buffer) => {
        listenFunc(buffer);
        logger.info(`${namespace}.install.error:`, buffer.toString());
    });
    childProcess.on('exit', (code) => {
        socket.emit(`adapter.${namespace}.install.exit`, code);
    });
};
class Dependency {
    constructor(params) {
        const { project, storage } = params;
        this.project = project;
        this.storage = storage;
        this.path = path.join(this.project.path, 'node_modules');
    }
    async getLocalVersion(name) {
        const pkgPath = path.join(this.path, name, 'package.json');
        const version = (await fsExtra.readJson(pkgPath)).version;
        return version;
    }
    async getNpmOutdated() {
        let npmOutdated = [];
        try {
            const [npmClient, registry] = await getNpmClient_1.default();
            const args = ['outdated', '--json'].concat(registry ? ['--registry', registry] : []);
            await execa(npmClient, args, { cwd: this.project.path, env: this.project.getEnv() });
        }
        catch (error) {
            if (error.errno) {
                throw error;
            }
            else if (error.stdout) {
                // the process exit with 1 if got outdated
                npmOutdated = JSON.parse(error.stdout);
            }
        }
        return Object.entries(npmOutdated).map(([key, value]) => (Object.assign({ package: key }, value)));
    }
    async create(params, ctx) {
        const { dependency, isDev } = params;
        const [npmClient, registry] = await getNpmClient_1.default();
        return (await exports.install({
            dependencies: [dependency],
            npmClient,
            registry,
            isDev,
            project: this.project,
            namespace: 'dependency',
            ctx,
        }))[0];
    }
    async bulkCreate(params, ctx) {
        const { dependencies, isDev } = params;
        const [npmClient, registry] = await getNpmClient_1.default();
        return await exports.install({
            dependencies,
            npmClient,
            registry,
            isDev,
            project: this.project,
            namespace: 'dependency',
            ctx,
        });
    }
    async getAll() {
        const { dependencies: packageDependencies, devDependencies: packageDevDependencies } = this.project.getPackageJSON();
        const getAll = async (list, dev) => {
            return await Promise.all(Object.entries(list).map(async ([packageName, specifyVersion]) => {
                let localVersion = '';
                try {
                    localVersion = await this.getLocalVersion(packageName);
                }
                catch (error) {
                    // ignore error
                }
                return {
                    package: packageName,
                    specifyVersion,
                    dev,
                    localVersion,
                };
            }));
        };
        let dependencies = [];
        if (packageDependencies) {
            dependencies = await getAll(packageDependencies, false);
        }
        let devDependencies = [];
        if (packageDevDependencies) {
            devDependencies = await getAll(packageDevDependencies, true);
        }
        // TODO getNpmOutdated is so slow, so we disable it now
        const npmOutdated = []; // await this.getNpmOutdated();
        npmOutdated.forEach(({ package: _outPackage, wanted }) => {
            const dependency = dependencies.find(({ package: packageName }) => packageName === _outPackage);
            if (dependency && dependency.localVersion && dependency.localVersion !== wanted) {
                dependency.wantedVestion = wanted;
            }
            const devDependency = devDependencies.find(({ package: packageName }) => packageName === _outPackage);
            if (devDependency && devDependency.localVersion && devDependency.localVersion !== wanted) {
                devDependency.wantedVestion = wanted;
            }
        });
        return {
            dependencies,
            devDependencies,
        };
    }
    async reset(arg, ctx) {
        const { socket, i18n, logger } = ctx;
        socket.emit('adapter.dependency.reset.data', { chunk: i18n.format('baseAdapter.dependency.reset.clearWait') });
        await rimrafAsync(this.path);
        socket.emit('adapter.dependency.reset.data', { chunk: i18n.format('baseAdapter.dependency.reset.clearDone') });
        socket.emit('adapter.dependency.reset.data', { chunk: i18n.format('baseAdapter.dependency.reset.startInstall') });
        const [npmClient, registry] = await getNpmClient_1.default();
        const args = ['install', '--loglevel', 'silly'].concat(registry ? ['--registry', registry] : []);
        const childProcess = execa(npmClient, args, {
            cwd: this.project.path,
            env: this.project.getEnv(),
            stdio: ['inherit', 'pipe', 'pipe'],
        });
        const listenFunc = (buffer) => {
            const chunk = buffer.toString();
            socket.emit('adapter.dependency.reset.data', {
                chunk,
                isStdout: true,
            });
        };
        childProcess.stdout.on('data', listenFunc);
        childProcess.stderr.on('data', listenFunc);
        childProcess.on('error', (buffer) => {
            listenFunc(buffer);
            logger.info('reset.error:', buffer.toString());
        });
        childProcess.on('exit', (code, signal) => {
            logger.info('reset.exit:', code, signal);
            socket.emit('adapter.dependency.reset.exit', code);
        });
    }
    async upgrade(denpendency, ctx) {
        const { package: packageName } = denpendency;
        const { socket, i18n, logger } = ctx;
        socket.emit('adapter.dependency.upgrade.data', { chunk: i18n.format('baseAdapter.dependency.reset.startInstall', { packageName }) });
        const [npmClient, registry] = await getNpmClient_1.default();
        const args = ['update', packageName, '--loglevel', 'silly'].concat(registry ? ['--registry', registry] : []);
        const childProcess = execa(npmClient, args, {
            cwd: this.project.path,
            env: this.project.getEnv(),
            stdio: ['inherit', 'pipe', 'pipe'],
        });
        const listenFunc = (buffer) => {
            const chunk = buffer.toString();
            logger.info('upgrade.data:', chunk);
            socket.emit('adapter.dependency.upgrade.data', {
                chunk,
                isStdout: true,
            });
        };
        childProcess.stdout.on('data', listenFunc);
        childProcess.stderr.on('data', listenFunc);
        childProcess.on('error', (buffer) => {
            listenFunc(buffer);
            logger.info('upgrade.error:', buffer.toString());
        });
        childProcess.on('exit', (code, signal) => {
            logger.info('upgrade.exit:', code, signal);
            socket.emit('adapter.dependency.upgrade.exit', code);
        });
    }
}
exports.default = Dependency;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2FkYXB0ZXIvbW9kdWxlcy9kZXBlbmRlbmN5L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTZCO0FBQzdCLG9DQUFvQztBQUNwQyw2QkFBNkI7QUFDN0IsaUNBQWlDO0FBQ2pDLCtCQUErQjtBQUMvQixtREFBbUQ7QUFDbkQsd0RBQWlEO0FBSWpELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFOUIsUUFBQSxPQUFPLEdBQUcsS0FBSyxFQUMxQixNQVFDLEVBQ2MsRUFBRTtJQUNqQixNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDO0lBQ3JGLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQztJQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsU0FBUyxlQUFlLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQywyQ0FBMkMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUV0SCxNQUFNLElBQUksR0FBRyxDQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7U0FDbkcsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsV0FBVyxJQUFJLE9BQU8sRUFBRSxDQUFDLENB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