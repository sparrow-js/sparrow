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
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require('@lukeed/uuid');
const _ = __importStar(require("lodash"));
const cheerio = __importStar(require("cheerio"));
const fsExtra = __importStar(require("fs-extra"));
class Box {
    constructor(storage, globalConfig) {
        this.uuid = '';
        this.components = [];
        this.storage = {};
        this.observe = null;
        this.$fragment = null;
        this.name = '';
        this.alias = '';
        this.widgetType = 'box';
        this.treePath = ''; // 标记容器树路径
        this.previewType = 0;
        this.config = {};
        this._attrStr = '';
        this.globalConfig = {};
        this.storage = storage;
        this.globalConfig = globalConfig;
        this.uuid = uuid().split('-')[0];
    }
    resetRender() { }
    getFragment(index) {
        const type = this.storage.get('preview_view_status') || 0;
        let box = '';
        if (type === 0) {
            this.$fragment.root().children().attr('data-design-mode', 'design-border');
            this.$fragment.root().children().attr('data-instance-name', this.name);
            this.$fragment.root().children().attr('data-id', this.uuid);
            box = this.$fragment.html();
        }
        else {
            box = this.$fragment.html();
        }
        return cheerio.load(`
          ${box}
      `, {
            xmlMode: true,
            decodeEntities: false
        });
        ;
    }
    addComponent(data, operatetype = 'manual') {
        const { projectPaths } = this.globalConfig;
        let { id, params = {}, nextSiblingId, config, path } = data;
        if (config) {
            config.initType = operatetype;
        }
        let compIndex = -2;
        if (nextSiblingId) {
            compIndex = this.components.findIndex((item) => item.uuid === nextSiblingId);
        }
        const hasBox = fsExtra.pathExistsSync(projectPaths.materielPath + `/box/${id}`);
        let isPlugins = false;
        if (id.includes('sparrow')) {
            isPlugins = true;
        }
        let backComp = null;
        if (isPlugins) {
            const dynamicObj = require(path).default;
            const comp = new dynamicObj(config || data, this.storage);
            comp.path = path;
            if (compIndex >= 0) {
                this.components.splice(compIndex, 0, comp);
            }
            else {
                this.components.push(comp);
            }
            backComp = comp;
        }
        else if (path) {
            const dynamicObj = require(projectPaths.materielPath + `${path}`).default;
            const comp = new dynamicObj(config || data, this.storage);
            comp.path = path;
            if (compIndex >= 0) {
                this.components.splice(compIndex, 0, comp);
            }
            else {
                this.components.push(comp);
            }
            backComp = comp;
        }
        else if (hasBox) {
            const dynamicObj = require(projectPaths.materielPath + `/box/${id}`).default;
            const comp = new dynamicObj(data, this.storage);
            if (compIndex >= 0) {
                this.components.splice(compIndex, 0, comp);
            }
            else {
                this.components.push(comp);
            }
            backComp = comp;
        }
        else {
            const dynamicObj = require(projectPaths.materielPath + `/component/${id}`).default;
            const comp = new dynamicObj(config || params, this.treePath);
            if (compIndex >= 0) {
                this.components.splice(compIndex, 0, comp);
            }
            else {
                this.components.push(comp);
            }
            backComp = null;
        }
        return backComp;
    }
    settingConfig(config) {
        this.config = config;
        this.setAttrsToStr();
        this.customAttrHandler();
    }
    customAttrHandler() { }
    setAttrsToStr() {
        const { config } = this;
        if (_.get(config, 'model.attr')) {
            const formField = [];
            Object.keys(config.model.attr).forEach(key => {
                if (!config.model.attr[key]) {
                    return;
                }
                formField.push(`${key}="${config.model.attr[key]}"`);
            });
            this._attrStr = formField.join(' ');
        }
    }
    renderComp() {
        const type = this.storage.get('preview_view_status') || 0;
        this.$fragment('.drag-box').first().empty();
        this.components.forEach((component) => {
            this.$fragment('.drag-box').first().append(component.getFragment(this.previewType).html());
        });
        if (this.components.length === 0 && type === 0) {
            this.$fragment('.drag-box').attr('data-empty', true);
        }
    }
    getConfig() {
        return this.config;
    }
}
exports.default = Box;
//# sourceMappingURL=Box.js.map