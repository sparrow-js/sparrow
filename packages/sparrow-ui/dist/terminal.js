"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sockjs_1 = __importDefault(require("sockjs"));
const get_1 = __importDefault(require("lodash/get"));
// import { sync as osLocaleSync } from 'os-locale';
// umiui:UmiUI:terminal
let term;
/**
 * get user default shell
 * /bin/zsh /bin/bash
 */
exports.getDefaultShell = () => {
    if (process.platform === 'darwin') {
        return process.env.SHELL || '/bin/bash';
    }
    if (process.platform === 'win32') {
        return process.env.COMSPEC || 'cmd.exe';
    }
    return process.env.SHELL || '/bin/sh';
};
/**
 * Security Check
 *
 */
const securityCheck = (conn) => {
    if (process.env.HOST === '0.0.0.0') {
        conn.write('The current environment is not safe.');
        return false;
    }
    return true;
};
exports.resizeTerminal = (opts) => {
    const { cols, rows } = opts;
    if (term && cols && rows) {
        term.resize(cols, rows);
    }
};
/**
 * export terminal socket init needs bind express app server
 */
function default_1(server) {
    const terminalSS = sockjs_1.default.createServer();
    terminalSS.on('connection', conn => {
        const { currentProject, projectsByKey } = this.config.data;
        const currentProjectCwd = get_1.default(projectsByKey, `${currentProject}.path`);
        const cwd = currentProjectCwd || this.cwd || process.cwd();
        // insecurity env to run shell
        const safe = securityCheck(conn);
        let spawn;
        try {
            // eslint-disable-next-line prefer-destructuring
            spawn = require('node-pty').spawn;
        }
        catch (e) {
            conn.write('Failed to install or prebuild node-pty module, please see docs: https://umijs.org/guide/faq.html#terminal-need-node-pty-module');
            return false;
        }
        if (safe) {
            const defaultShell = exports.getDefaultShell();
            const defaultShellArgs = ['--login'];
            term = spawn(defaultShell, defaultShellArgs, {
                name: 'xterm-color',
                cols: 180,
                rows: 30,
                cwd,
                env: Object.assign(Object.assign({}, process.env), { 
                    // LANG: `${osLocaleSync()}.UTF-8`,
                    TERM: 'xterm-256color', COLORTERM: 'truecolor' }),
            });
            /**
             * stringify command shell string
             * @param command ls/... shell commands
             */
            term.onData(chunk => {
                // _log('ptyProcess data', chunk);
                conn.write(chunk);
            });
            // === socket listener ===
            conn.on('data', data => {
                // _log('terminal conn message', data);
                term.write(data);
            });
            conn.on('close', () => {
                // maybe change the pty cwd
                term.kill();
            });
        }
    });
    terminalSS.installHandlers(server, {
        prefix: '/terminal-socket',
        log: () => { },
    });
}
exports.default = default_1;
//# sourceMappingURL=terminal.js.map