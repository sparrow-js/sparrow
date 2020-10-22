"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __importStar(require("cheerio"));
const parser = __importStar(require("@babel/parser"));
const traverse_1 = __importDefault(require("@babel/traverse"));
const generator_1 = __importDefault(require("@babel/generator"));
const _ = __importStar(require("lodash"));
class VueParse {
    constructor(uuid, vueStr) {
        this.template = '';
        this.data = [];
        this.methods = [];
        this.components = [];
        this.importDeclarations = [];
        this.uuid = '';
        this.vueStr = '';
        this.vueScript = '';
        this.style = '';
        this.uuid = uuid;
        this.vueStr = vueStr.replace(/_unique/g, this.uuid);
        this.init();
    }
    init() {
        let template = this.vueStr.match(/<template>([\s\S])*<\/template>/g);
        if (template) {
            template = template[0];
        }
        const style = this.vueStr.match(/(?<=<style[\s\S]*>)[\s\S]*(?=<\/style>)/g);
        if (style) {
            this.style = style[0];
        }
        if (template) {
            this.$ = cheerio.load(template, {
                xmlMode: true,
                decodeEntities: false
            });
            this.template = this.$('.root').html();
        }
        this.vueScript = this.vueStr.match(/(?<=<script>)[\s\S]*(?=<\/script>)/g)[0];
        this.scriptAst = parser.parse(this.vueScript, {
            sourceType: 'module',
            plugins: [
                "jsx",
            ]
        });
        this.data = this.getData() || [];
        this.methods = this.getMethods() || [];
        this.components = this.getComponents() || [];
        this.getImport();
        this.created = this.getCreated();
    }
    getData() {
        let data = [];
        traverse_1.default(this.scriptAst, {
            ObjectMethod: (path) => {
                const { node } = path;
                if (node.key && node.key.name === 'data') {
                    path.traverse({
                        ReturnStatement: (pathData) => {
                            data = pathData.node.argument.properties;
                        }
                    });
                }
            }
        });
        return data;
    }
    setData(data) {
        const dataAst = parser.parse(data, {
            sourceType: 'module',
            plugins: [
                "jsx",
            ]
        });
        traverse_1.default(dataAst, {
            ObjectExpression: (path) => {
                if (path.parent.type === 'VariableDeclarator') {
                    const { node } = path;
                    this.data = node.properties;
                }
            }
        });
    }
    getFormatData() {
        const dataAst = parser.parse(`var data = {
      id: []
    }`, {
            sourceType: 'module',
            plugins: [
                "jsx",
            ]
        });
        traverse_1.default(dataAst, {
            ObjectExpression: (path) => {
                if (path.parent.type === 'VariableDeclarator') {
                    const { node } = path;
                    node.properties = this.data;
                }
            }
        });
        return generator_1.default(dataAst).code;
    }
    getMethods() {
        let methods = [];
        traverse_1.default(this.scriptAst, {
            ObjectProperty: (path) => {
                const { node } = path;
                if (node.key.name === 'methods') {
                    methods = node.value.properties;
                }
            }
        });
        return methods;
    }
    getComponents() {
        let components = [];
        traverse_1.default(this.scriptAst, {
            ObjectProperty: (path) => {
                const { node } = path;
                if (node.key.name === 'components') {
                    components = node.value.properties;
                }
            }
        });
        return components;
    }
    getImport() {
        const body = _.get(this.scriptAst, 'program.body') || [];
        body.forEach((item) => {
            if (item.type === 'ImportDeclaration') {
                this.importDeclarations.push({
                    path: _.get(item, 'source.value'),
                    node: item
                });
            }
        });
    }
    getCreated() {
        let created = null;
        traverse_1.default(this.scriptAst, {
            ObjectMethod: (path) => {
                const { node } = path;
                if (node.key.name === 'created') {
                    created = node;
                }
            }
        });
        return created;
    }
}
exports.default = VueParse;
//# sourceMappingURL=VueParse.js.map