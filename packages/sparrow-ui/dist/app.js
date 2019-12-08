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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sockjs_1 = __importDefault(require("sockjs"));
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = __importDefault(require("body-parser"));
const got_1 = __importDefault(require("got"));
const fs_1 = require("fs");
const path_1 = require("path");
const userController = __importStar(require("./controllers/user"));
const LOCAL_DEBUG = process.env.LOCAL_DEBUG;
const app = express_1.default();
app.use(compression_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
/**
 * Primary app routes.
 */
// app.get("/", userController.index);
app.get("/login", userController.getLogin);
function replaceScripts(body) {
    return body.replace(/(\/js.+?.js)/g, '//localhost:8080$1');
}
if (!LOCAL_DEBUG) {
    app.use(express_1.default.static(path_1.join(__dirname, '../client/dist'), {
        index: false,
    }));
}
app.use('/*', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (LOCAL_DEBUG) {
        const { body } = yield got_1.default(`http://localhost:8080${req.path}`);
        res.set('Content-Type', 'text/html');
        res.send(replaceScripts(body));
    }
    else {
        const content = fs_1.readFileSync(path_1.join(__dirname, '../client/dist/index.html'), 'utf-8');
        res.send(content);
    }
}));
const ss = sockjs_1.default.createServer();
ss.on('connection', conn => {
    conn.on('close', () => {
    });
    conn.on('data', message => {
        conn.write(message);
    });
});
const port = 3000;
const server = app.listen(port, process.env.HOST || '127.0.0.1', err => {
    // just TEST or ALL ?
});
ss.installHandlers(server, {
    prefix: '/sprui',
    log: () => { },
});
exports.default = app;
//# sourceMappingURL=app.js.map