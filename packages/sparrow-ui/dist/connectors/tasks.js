"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const execa_1 = __importDefault(require("execa"));
const RunViewTask_1 = __importDefault(require("./RunViewTask"));
const parseArgs_1 = require("../util/parseArgs");
const tasks = new Map();
function addTask(id, context) {
    if (id) {
        tasks.set(id, context);
    }
}
addTask(RunViewTask_1.default.id, RunViewTask_1.default);
function getTask(id) {
    return tasks.get(id);
}
function run(id, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const task = getTask(id);
        let [command, ...args] = parseArgs_1.parseArgs(task.command);
        const child = execa_1.default(command, args, {
            cwd: task.path,
            stdio: ['inherit', 'pipe', 'pipe'],
            shell: true
        });
        child.stdout.on('data', buffer => {
            console.log(buffer.toString());
        });
        child.stderr.on('data', buffer => {
            console.log(buffer.toString());
        });
    });
}
exports.run = run;
function stop(id, context) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
//# sourceMappingURL=tasks.js.map