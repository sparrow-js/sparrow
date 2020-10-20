"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = require("cheerio");
const _ = require("lodash");
const uuid = require('@lukeed/uuid');
class Base {
    constructor(storage = {}) {
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
        if (this.boxPath.match('Form') || _.get(this.config, 'model.custom.insideForm') === true) {
            this.config.model.custom.insideForm = true;
            formItem = `
        <el-form-item label=" "
          ${this._formItemStr}
        >
          <edit-text-box slot="label" :clearClass="true" uuid="${this.uuid}">
            ${_.get(this.config, 'model.custom.label')}
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
            this.$fragment('el-form-item').attr('label', _.get(this.config, 'model.custom.label'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0NvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFtQztBQUNuQyw0QkFBNEI7QUFDNUIsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBRXJDLE1BQXFCLElBQUk7SUFhdkIsWUFBYSxVQUFlLEVBQUU7UUFadkIsZUFBVSxHQUFHLE1BQU0sQ0FBQyxDQUFDLE9BQU87UUFFNUIsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1YsV0FBTSxHQUFRLEVBQUUsQ0FBQztRQUNqQixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLGlCQUFZLEdBQVcsRUFBRSxDQUFDO1FBQzFCLG1CQUFjLEdBQUcsUUFBUSxDQUFDO1FBQzFCLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFDckIsWUFBTyxHQUFRLEVBQUUsQ0FBQztRQUNsQixTQUFJLEdBQVcsRUFBRSxDQUFDO1FBR3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTSxjQUFjO1FBQ25CLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQTtRQUNqQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSx5QkFBeUIsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUN4RixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUUzQyxRQUFRLEdBQUk7O1lBRU4sSUFBSSxDQUFDLFlBQVk7O2lFQUVvQyxJQUFJLENB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