"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const parser = require("@babel/parser");
const traverse_1 = require("@babel/traverse");
const generator_1 = require("@babel/generator");
const t = require("@babel/types");
const uid = require("uid");
const formatCodeFromAST_1 = require("../../utils/formatCodeFromAST");
const ASIDE_CONFIG_VARIABLE = 'asideMenuConfig';
const HEADER_CONFIG_VARIABLE = 'headerMenuConfig';
class Menu {
    constructor(params) {
        this.configFilePath = 'config/menu';
        const { project, storage } = params;
        this.storage = storage;
        this.project = project;
        this.path = path.join(this.project.path, 'src', `${this.configFilePath}.${this.project.language}`);
    }
    getFileAST() {
        const menuFileString = fs.readFileSync(this.path).toString();
        const menuFileAST = parser.parse(menuFileString, {
            sourceType: 'module',
        });
        return menuFileAST;
    }
    getMenuCode(node, name) {
        let code = '';
        if (t.isIdentifier(node.id, { name })
            && t.isArrayExpression(node.init)) {
            code = generator_1.default(node.init).code;
        }
        return code;
    }
    async getAll() {
        let asideMenuConfig = [];
        let headerMenuConfig = [];
        const menuFileAST = this.getFileAST();
        const getMenuCode = this.getMenuCode;
        traverse_1.default(menuFileAST, {
            VariableDeclarator({ node }) {
                const asideMenuCode = getMenuCode(node, ASIDE_CONFIG_VARIABLE);
                const headerMenuCode = getMenuCode(node, HEADER_CONFIG_VARIABLE);
                if (asideMenuCode) {
                    asideMenuConfig = eval(asideMenuCode); // eslint-disable-line
                }
                if (headerMenuCode) {
                    headerMenuConfig = eval(headerMenuCode); // eslint-disable-line
                }
            },
        });
        return {
            asideMenuConfig: this.handlerData(asideMenuConfig),
            headerMenuConfig: this.handlerData(headerMenuConfig),
        };
    }
    async bulkCreate(params) {
        let { data = [] } = params;
        const { options = {} } = params;
        const { replacement = false, type = 'aside' } = options;
        const { asideMenuConfig, headerMenuConfig } = await this.getAll();
        const menuFileAST = this.getFileAST();
        const name = type === 'aside' ? ASIDE_CONFIG_VARIABLE : HEADER_CONFIG_VARIABLE;
        if (!replacement) {
            if (type === 'aside') {
                data = data.concat(asideMenuConfig);
            }
            else {
                data = data.concat(headerMenuConfig);
            }
        }
        this.setData(data, menuFileAST, name);
    }
    async delete(params) {
        const { paths } = params;
        const menuFileAST = this.getFileAST();
        const { asideMenuConfig, headerMenuConfig } = await this.getAll();
        this.setData(this.removeItemByPaths(asideMenuConfig, paths), menuFileAST, ASIDE_CONFIG_VARIABLE);
        this.setData(this.removeItemByPaths(headerMenuConfig, paths), menuFileAST, HEADER_CONFIG_VARIABLE);
    }
    removeItemByPaths(data, paths) {
        const removeIndex = [];
        data.forEach((item, index) => {
            if (paths.indexOf(item.path) > -1) {
                removeIndex.unshift(index);
            }
            if (item.children) {
                item.children = this.removeItemByPaths(item.children, paths);
            }
        });
        removeIndex.forEach((index) => {
            data.splice(index, 1);
        });
        return data;
    }
    setData(data, menuAST, name) {
        const dataAST = parser.parse(JSON.stringify(this.handlerData(data)), {
            sourceType: 'module',
        });
        const arrayAST = dataAST.program.body[0];
        traverse_1.default(menuAST, {
            VariableDeclarator({ node }) {
                if (t.isIdentifier(node.id, { name })
                    && t.isArrayExpression(node.init)) {
                    node.init = arrayAST;
                }
            },
        });
        fs.writeFileSync(this.path, formatCodeFromAST_1.default(menuAST));
    }
    /**
     * handler data eg. generate id
     */
    handlerData(data) {
        return data.map((item) => {
            if (Array.isArray(item.children)) {
                item.children = this.handlerData(item.children);
            }
            item.id = item.id || `Menu_${uid(5)}`;
            return item;
        });
    }
}
exports.default = Menu;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2FkYXB0ZXIvbW9kdWxlcy9tZW51L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTZCO0FBQzdCLHlCQUF5QjtBQUN6Qix3Q0FBd0M7QUFDeEMsOENBQXVDO0FBQ3ZDLGdEQUF3QztBQUN4QyxrQ0FBa0M7QUFDbEMsMkJBQTJCO0FBRTNCLHFFQUE4RDtBQUc5RCxNQUFNLHFCQUFxQixHQUFHLGlCQUFpQixDQUFDO0FBQ2hELE1BQU0sc0JBQXNCLEdBQUcsa0JBQWtCLENBQUM7QUFFbEQsTUFBcUIsSUFBSTtJQVN2QixZQUFZLE1BQTBDO1FBRi9DLG1CQUFjLEdBQUcsYUFBYSxDQUFDO1FBR3BDLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsTUFBTSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUNyRyxDQUFDO0lBRU8sVUFBVTtRQUNoQixNQUFNLGNBQWMsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM3RCxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRTtZQUMvQyxVQUFVLEVBQUUsUUFBUTtTQUNyQixDQUFDLENBQUM7UUFFSCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBRU8sV0FBVyxDQUFDLElBQVMsRUFBRSxJQUFZO1FB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