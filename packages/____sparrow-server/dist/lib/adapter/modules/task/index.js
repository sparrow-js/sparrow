"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const execa = require("execa");
const fs = require("fs-extra");
const detectPort = require("detect-port");
const path = require("path");
const iconv = require("iconv-lite");
const iconvJschardet = require("iconv-jschardet");
const terminate = require("terminate");
const os = require("os");
const chalk_1 = require("chalk");
const pathKey = require("path-key");
const cliConf_1 = require("../../utils/cliConf");
const getNpmClient_1 = require("../../../getNpmClient");
const getTaskConfig_1 = require("./getTaskConfig");
const DEFAULT_PORT = '4444';
const TASK_STATUS_WORKING = 'working';
const TASK_STATUS_STOP = 'stop';
class Task {
    constructor(params) {
        this.status = {};
        this.installed = true;
        this.process = {};
        this.cliConfFilename = 'ice.config.js';
        this.getTaskConfig = getTaskConfig_1.default;
        const { project, storage } = params;
        this.project = project;
        this.storage = storage;
        this.cliConfPath = path.join(this.project.path, this.cliConfFilename);
    }
    /**
     * run start task
     * @param args
     */
    async start(args, ctx) {
        const { i18n, logger } = ctx;
        const projectEnv = this.project.getEnv();
        const nodeModulesPath = path.join(this.project.path, 'node_modules');
        const pathExists = await fs.pathExists(nodeModulesPath);
        if (!pathExists) {
            this.installed = false;
            return this;
        }
        this.installed = true;
        const { command } = args;
        if (this.process[command]) {
            throw new Error(i18n.format('baseAdapter.task.runing'));
        }
        let env = {};
        if (command === 'dev') {
            env = { PORT: await detectPort(DEFAULT_PORT) };
        }
        const [npmClient] = await getNpmClient_1.default();
        const eventName = `start.data.${command}`;
        try {
            const isWindows = os.type() === 'Windows_NT';
            const findCommand = isWindows ? 'where' : 'which';
            const { stdout: nodePath } = await execa(findCommand, ['node'], {
                env: projectEnv,
            });
            const { stdout: npmPath } = await execa(findCommand, [npmClient], {
                env: projectEnv,
            });
            ctx.socket.emit(`adapter.task.${eventName}`, {
                status: this.status[command],
                chunk: `using node: ${nodePath}\nusing npm ${npmClient}: ${npmPath}\nprocess.env.PATH: ${projectEnv[pathKey()]}\n`,
            });
        }
        catch (error) {
            // ignore error
        }
        this.process[command] = execa(npmClient, ['run', command === 'dev' ? 'start' : command], {
            cwd: this.project.path || process.cwd(),
            stdio: ['inherit', 'pipe', 'pipe'],
            env: Object.assign({}, projectEnv, env),
        });
        this.process[command].stdout.on('data', buffer => {
            this.status[command] = TASK_STATUS_WORKING;
            ctx.socket.emit(`adapter.task.${eventName}`, {
                status: this.status[command],
                isStdout: true,
                chunk: buffer.toString(),
            });
        });
        this.process[command].stderr.on('data', buffer => {
            this.status[command] = TASK_STATUS_WORKING;
            const encodingType = iconvJschardet.detect(buffer);
            const chunk = encodingType.encoding === 'GB2312' ? iconv.decode(buffer, 'gbk') : buffer.toString();
            ctx.socket.emit(`adapter.task.${eventName}`, {
                status: this.status[command],
                isStdout: false,
                chunk,
            });
        });
        this.process[command].on('close', () => {
            this.process[command] = null;
            this.status[command] = TASK_STATUS_STOP;
            ctx.socket.emit(`adapter.task.${eventName}`, {
                status: this.status[command],
                isStdout: true,
                chunk: chalk_1.default.grey('Task has stopped'),
            });
        });
        this.process[command].on('error', error => {
            // emit adapter.task.error to show message
            const errMsg = error.toString();
            logger.error(errMsg);
            ctx.socket.emit('adapter.task.error', {
                message: errMsg,
                isStdout: true,
            });
        });
        return this;
    }
    /**
     * run stop task
     * @param args
     */
    async stop(args, ctx) {
        const { command } = args;
        const eventName = `stop.data.${command}`;
        // check process if it is been closed
        if (this.process[command]) {
            const { pid } = this.process[command];
            terminate(pid, err => {
                if (err) {
                    const errMsg = err.toString();
                    ctx.logger.error(errMsg);
                    ctx.socket.emit('adapter.task.error', {
                        message: errMsg,
                    });
                }
                this.status[command] = TASK_STATUS_STOP;
                this.process[command] = null;
                ctx.socket.emit(`adapter.task.${eventName}`, {
                    status: this.status[command],
                    isStdout: true,
                    chunk: chalk_1.default.grey('Task has stopped'),
                });
            });
        }
        return this;
    }
    getStatus(args) {
        const { command } = args;
        if (command) {
            return this.status[command];
        }
    }
    /**
     * get the conf of the current task
     * @param args
     */
    async getConf(args, ctx) {
        const taskConfig = this.getTaskConfig(ctx);
        switch (args.command) {
            case 'dev':
                return this.getDevConf(taskConfig);
            case 'build':
                return cliConf_1.getCLIConf(this.cliConfPath, taskConfig.build);
            case 'lint':
                // @TODO support lint configuration
                return null;
            default:
                return [];
        }
    }
    /**
     * set the conf of the current task
     * @param args
     */
    async setConf(args) {
        switch (args.command) {
            case 'dev':
                return this.setDevConf(args);
            case 'build':
                return cliConf_1.setCLIConf(this.cliConfPath, args.options);
            default:
                return false;
        }
    }
    /**
     * get dev configuration
     * merge the user configuration to return to the new configuration
     * @param projectPath
     */
    getDevConf(taskConfig) {
        const pkgContent = this.project.getPackageJSON();
        const devScriptContent = pkgContent.scripts.start;
        const devScriptArray = devScriptContent.split(' ');
        const userConf = {};
        devScriptArray.forEach(item => {
            if (item.indexOf('--') !== -1) {
                const key = item.match(/--(\S*)=/)[1];
                const value = item.match(/=(\S*)$/)[1];
                userConf[key] = value;
            }
        });
        return cliConf_1.mergeCLIConf(taskConfig.dev, userConf);
    }
    /**
     * set dev configuration
     * @param args
     */
    setDevConf(args) {
        const pkgContent = this.project.getPackageJSON();
        const devScriptContent = pkgContent.scripts.start;
        const devScriptArray = devScriptContent.split(' ');
        const cli = devScriptArray[0];
        const command = devScriptArray[1];
        let newDevScriptContent = `${cli} ${command}`;
        Object.keys(args.options).forEach(key => {
            if (args.options[key]) {
                newDevScriptContent += ` --${key}=${args.options[key]}`;
            }
        });
        pkgContent.scripts.start = newDevScriptContent;
        this.project.setPackageJSON(pkgContent);
    }
}
exports.default = Task;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2FkYXB0ZXIvbW9kdWxlcy90YXNrL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQStCO0FBQy9CLCtCQUErQjtBQUMvQiwwQ0FBMEM7QUFDMUMsNkJBQTZCO0FBQzdCLG9DQUFvQztBQUNwQyxrREFBa0Q7QUFDbEQsdUNBQXVDO0FBQ3ZDLHlCQUF5QjtBQUN6QixpQ0FBMEI7QUFDMUIsb0NBQW9DO0FBQ3BDLGlEQUEyRTtBQUMzRSx3REFBaUQ7QUFRakQsbURBQTRDO0FBRTVDLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQztBQUM1QixNQUFNLG1CQUFtQixHQUFHLFNBQVMsQ0FBQztBQUN0QyxNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQztBQUVoQyxNQUFxQixJQUFJO0lBaUJ2QixZQUFZLE1BQTJDO1FBWi9DLFdBQU0sR0FBVyxFQUFFLENBQUM7UUFFcEIsY0FBUyxHQUFZLElBQUksQ0FBQztRQUkxQixZQUFPLEdBQVcsRUFBRSxDQUFDO1FBRXRCLG9CQUFlLEdBQUcsZUFBZSxDQUFDO1FBRWxDLGtCQUFhLEdBQWlDLHVCQUFhLENBQUM7UUFHakUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsR0FBRyxNQUFNLENBQUM7UUFDcEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFnQixFQUFFLEdBQWE7UUFDaEQsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FB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