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
const lodash_1 = __importDefault(require("lodash"));
const uuid = require('@lukeed/uuid');
class Base {
    constructor(storage) {
        this.ascription = 'form'; // 表单归属
        this.labelValue = '';
        this.uuid = '';
        this.config = {};
        this._attrStr = '';
        this._formItemStr = '';
        this.insertFileType = 'inline';
        this.boxPath = '';
        this.storage = {};
        this.name = '';
        this.storage = storage;
        this.uuid = uuid().split('-')[0];
    }
    renderFragment() {
        let formItem = '';
        if (this.boxPath.match('Form') || lodash_1.default.get(this.config, 'model.custom.insideForm') === true) {
            this.config.model.custom.insideForm = true;
            formItem = `
        <el-form-item label=" "
          ${this._formItemStr}
        >
          <edit-text-box slot="label" :clearClass="true" uuid="${this.uuid}">
            ${lodash_1.default.get(this.config, 'model.custom.label')}
          </edit-text-box>
          ${this.fragment()}
        </el-form-item>
      `;
        }
        else {
            formItem = this.fragment();
        }
        this.$fragment = cheerio.load(formItem, {
            xmlMode: true,
            decodeEntities: false,
        });
        const type = this.storage.get('preview_view_status') || 0;
        if (type === 0) {
            this.$fragment.root().children().attr('data-design-mode', 'design-border');
            this.$fragment.root().children().attr('data-instance-name', this.name);
            this.$fragment.root().children().attr('data-id', this.uuid);
            this.$fragment.root().children().attr('data-type', 'component');
        }
    }
    fragment() {
        return '';
    }
    getFragment(type) {
        this.renderFragment();
        if (type === 1) {
            this.$fragment('label-box').remove();
            this.$fragment('el-form-item').attr('label', lodash_1.default.get(this.config, 'model.custom.label'));
        }
        return this.$fragment;
    }
    insertEditText(params) {
        this.config.model.custom.label = params.value;
    }
    getConfig() {
        return this.config;
    }
    setHandler() { }
    settingConfig(config) {
        this.config = config;
        this.setAttrsToStr();
        this.setHandler();
    }
    setAttrsToStr() {
        const { config } = this;
        if (config.model.attr) {
            const formField = [];
            Object.keys(config.model.attr).forEach(key => {
                // key === 'v-model' && 
                if (config.model.attr[key] === '') {
                    return;
                }
                formField.push(`${key}="${config.model.attr[key]}"`);
            });
            this._attrStr = formField.join(' ');
        }
    }
    removeAttr(attr) {
        this.$fragment.root().children().removeAttr(attr);
    }
}
exports.default = Base;
//# sourceMappingURL=Component.js.map