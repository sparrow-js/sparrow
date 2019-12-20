"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const parser = require("@babel/parser");
const traverse_1 = require("@babel/traverse");
const generator_1 = require("@babel/generator");
const t = require("@babel/types");
const formatCodeFromAST_1 = require("../../utils/formatCodeFromAST");
const ROUTER_CONFIG_VARIABLE = 'routerConfig';
const LAYOUT_DIRECTORY = 'layouts';
const PAGE_DIRECTORY = 'pages';
const ROUTE_PROP_WHITELIST = ['component', 'path', 'exact', 'strict', 'sensitive', 'children', 'redirect'];
class Router {
    constructor(params) {
        this.configFilePath = 'config/routes';
        // whether import dependency should have prefix such as './' or '@/'
        this.noPathPrefix = false;
        const { project, storage } = params;
        this.project = project;
        this.storage = storage;
        this.path = path.join(this.project.path, 'src', `${this.configFilePath}.${this.project.language}`);
    }
    getASTByCode(code) {
        return parser.parse(code, {
            allowImportExportEverywhere: true,
            sourceType: 'module',
            plugins: [
                'dynamicImport',
            ],
        });
    }
    getRouterConfigAST() {
        const routerConfigString = fs.readFileSync(this.path).toString();
        const routerConfigAST = this.getASTByCode(routerConfigString);
        return routerConfigAST;
    }
    async getAll(params, ctx) {
        const { logger } = ctx;
        let config = [];
        const routerConfigAST = this.getRouterConfigAST();
        try {
            traverse_1.default(routerConfigAST, {
                VariableDeclarator: ({ node }) => {
                    if (t.isIdentifier(node.id, { name: ROUTER_CONFIG_VARIABLE })
                        && t.isArrayExpression(node.init)) {
                        config = this.parseRoute(node.init.elements);
                    }
                },
            });
        }
        catch (error) {
            logger.error(error);
        }
        return config;
    }
    parseRoute(elements) {
        const config = [];
        elements.forEach((element) => {
            // { path: '/home', component: Home, children: [] }
            const { properties } = element;
            const item = {};
            properties.forEach((property) => {
                const { key, value } = property;
                const { name: keyName } = key;
                // component is react Component
                if (keyName === 'component') {
                    item[keyName] = value.name;
                }
                else if (keyName === 'children') {
                    // children is array
                    item.children = this.parseRoute(value.elements);
                }
                else if (ROUTE_PROP_WHITELIST.indexOf(keyName) > -1) {
                    item[keyName] = value.value;
                }
            });
            if (Object.keys(item).length > 0) {
                config.push(item);
            }
        });
        return config;
    }
    // bulk create routers
    async bulkCreate(params, ctx) {
        let { data } = params;
        const { options = {} } = params;
        const { replacement = false, parent } = options;
        const routerConfigAST = this.getRouterConfigAST();
        const currentData = await this.getAll(undefined, ctx);
        if (!replacement) {
            if (parent) {
                const parentRouter = currentData.find((item) => {
                    if (item.children && item.path === parent) {
                        return true;
                    }
                    return false;
                });
                if (parentRouter) {
                    parentRouter.children = parentRouter.children.concat(data);
                    data = currentData;
                }
            }
            else {
                data = currentData.concat(data);
            }
        }
        this.setData(data, routerConfigAST);
    }
    async delete(params, ctx) {
        const { componentName } = params;
        const routerConfigAST = this.getRouterConfigAST();
        const data = await this.getAll(undefined, ctx);
        this.removePaths = [];
        this.setData(this.removeItemByComponent(data, componentName), routerConfigAST);
        return this.removePaths;
    }
    removeItemByComponent(data, componentName, parent) {
        const removeIndex = [];
        data.forEach((item, index) => {
            if (!item.children) {
                if (item.component === componentName) {
                    removeIndex.unshift(index);
                    if (item.path) {
                        if (parent) {
                            this.removePaths.push(path.join(parent.path, item.path));
                        }
                        else {
                            this.removePaths.push(item.path);
                        }
                    }
                }
            }
            else {
                item.children = this.removeItemByComponent(item.children, componentName, item);
            }
        });
        removeIndex.forEach((index) => {
            data.splice(index, 1);
        });
        return data;
    }
    setData(data, routerConfigAST) {
        const dataAST = this.getASTByCode(JSON.stringify(this.sortData(data)));
        const arrayAST = dataAST.program.body[0];
        this.changeImportDeclarations(routerConfigAST, data);
        /**
         * { path: '/a', component: 'Page' }
         *          transform to
         * { path: '/a', component: Page }
         */
        traverse_1.default(dataAST, {
            ObjectProperty({ node }) {
                if (['component'].indexOf(node.key.value) > -1) {
                    node.value = t.identifier(node.value.value);
                }
            },
        });
        traverse_1.default(routerConfigAST, {
            VariableDeclarator({ node }) {
                if (t.isIdentifier(node.id, { name: ROUTER_CONFIG_VARIABLE })
                    && t.isArrayExpression(node.init)) {
                    node.init = arrayAST;
                }
            },
        });
        fs.writeFileSync(this.path, formatCodeFromAST_1.default(routerConfigAST));
    }
    /**
     * sort data
     * eg.
     *  [{path: '/'}, {path: '/project'}, {path: '/project/abc'}, {path: '/bbc'}]
     *  [{path: '/project/abc'}, {path: '/project'}, {path: '/bbc'}, {path: '/'}]
     */
    sortData(data) {
        data.forEach((item) => {
            if (item.children) {
                item.children = this.sortData(item.children);
            }
        });
        return data.sort((beforeItem, item) => {
            if (!beforeItem.path) {
                return 1;
            }
            if (!item.path) {
                return -1;
            }
            if (beforeItem.path.indexOf(item.path) === 0) {
                return -1;
            }
            if (item.path.indexOf(beforeItem.path) === 0) {
                return 1;
            }
            return 0;
        });
    }
    /**
     * 1. constant if there is layout or component in the data and ImportDeclarations
     * 2. remove import if there is no layout or component in the data
     * 3. add import if there is no layout or component in the ImportDeclarations
     */
    changeImportDeclarations(routerConfigAST, data) {
        const importDeclarations = [];
        const removeIndex = [];
        // router import page or layout have @
        let existAtSign = false;
        this.existLazy = false;
        traverse_1.default(routerConfigAST, {
            ImportDeclaration: ({ node, key }) => {
                const { source } = node;
                // parse import declaration to get directory type (layouts or pages)
                // support three path types
                // 1. import xxx from 'pages/xxx';
                // 2. import xxx from './pages/xxx';
                // 3. import xxx from '@/pages/xxx';
                const noPrefixReg = /^(layouts|pages)\//;
                const hasPrefixReg = /^(\.|@)\/(layouts|pages)\//;
                const reg = this.noPathPrefix ? noPrefixReg : hasPrefixReg;
                const idx = this.noPathPrefix ? 1 : 2;
                const match = source.value.match(reg);
                if (match && match[idx]) {
                    const { specifiers } = node;
                    const { name } = specifiers[0].local;
                    if (!this.noPathPrefix) {
                        existAtSign = match[idx - 1] === '@';
                    }
                    importDeclarations.push({
                        index: key,
                        name,
                        type: match[idx],
                    });
                }
            },
            // parse eg. `const Forbidden = React.lazy(() => import('./pages/Exception/Forbidden'));`
            VariableDeclaration: ({ node, key }) => {
                const code = generator_1.default(node.declarations[0]).code;
                // parse const declaration to get directory type (layouts or pages)
                // support three path types
                // 1. const xxx = React.lazy(() => import('pages/xxx'));
                // 2. const xxx = React.lazy(() => import('./pages/xxx'));
                // 3. const xxx = React.lazy(() => import('@/pages/xxx'));
                const noPrefixReg = /(\w+)\s=\sReact\.lazy(.+)import\(['|"]((\w+)\/.+)['|"]\)/;
                const hasPrefixReg = /(\w+)\s=\sReact\.lazy(.+)import\(['|"]((\.|@)\/(\w+)\/.+)['|"]\)/;
                const matchLazyReg = this.noPathPrefix ? noPrefixReg : hasPrefixReg;
                const idx = this.noPathPrefix ? 4 : 5;
                const match = code.match(matchLazyReg);
                if (match && match.length > idx) {
                    this.existLazy = true;
                    existAtSign = match[idx - 1] === '@';
                    importDeclarations.push({
                        index: key,
                        name: match[1],
                        type: match[idx],
                    });
                }
            },
        });
        /**
         * remove import if there is no layout or component in the data
         */
        importDeclarations.forEach((importItem) => {
            const { name, type, index } = importItem;
            let needRemove = false;
            // match layout or page
            if (type) {
                let findRouter = null;
                if (type === LAYOUT_DIRECTORY) {
                    // layout only first layer
                    findRouter = data.find(item => item.children && item.component === name);
                }
                else if (type === PAGE_DIRECTORY) {
                    findRouter = data.find(item => {
                        let pageItem = null;
                        if (!item.children && item.component === name) {
                            pageItem = item;
                        }
                        if (item.children) {
                            item.children.forEach((route) => {
                                if (route.component === name) {
                                    pageItem = route;
                                }
                            });
                        }
                        return pageItem;
                    });
                }
                if (!findRouter) {
                    needRemove = true;
                }
            }
            if (needRemove) {
                removeIndex.unshift(index);
            }
        });
        removeIndex.forEach((index) => {
            routerConfigAST.program.body.splice(index, 1);
        });
        const existImport = this.existImport;
        // add new page or layout
        function setNewComponent(type, component) {
            const componentExist = existImport(importDeclarations, component, type);
            // no component dont add import
            if (!component) {
                return false;
            }
            if (!componentExist && !newImports.find(item => item.name === component)) {
                newImports.push({
                    type,
                    name: component,
                });
            }
        }
        /**
         * add import if there is no layout or component in the ImportDeclarations
         */
        const newImports = [];
        data.forEach(({ component, children }) => {
            if (children) {
                setNewComponent(LAYOUT_DIRECTORY, component);
                children.forEach((route) => setNewComponent(PAGE_DIRECTORY, route.component));
            }
            else {
                setNewComponent(PAGE_DIRECTORY, component);
            }
        });
        /**
         * add import to ast
         *  eg.
         *     import Page1 from './pages/Page1';
         *            or
         *     const Profile = React.lazy(() => import('./pages/Profile'));
         */
        let lazyCode = '';
        let importCode = '';
        const sign = '@';
        newImports.forEach(({ name, type }) => {
            if (this.noPathPrefix) {
                importCode += `import ${name} from '${type}/${name}';\n`;
            }
            else if (!this.existLazy || type === LAYOUT_DIRECTORY) {
                // layour or not exist lazy use `import Page from '@/pages/Page'`
                importCode += `import ${name} from '${sign}/${type}/${name}';\n`;
            }
            else {
                // use lazy `const Page = React.lazy(() => import('@/pages/Page'))`
                lazyCode += `const ${name} = React.lazy(() => import('${sign}/${type}/${name}'));\n`;
            }
        });
        // get ast from lazy or import code
        const lazyCodeAST = this.getASTByCode(lazyCode);
        const importCodeAST = this.getASTByCode(importCode);
        const lastIndex = this.findLastImportIndex(routerConfigAST);
        routerConfigAST.program.body.splice(lastIndex, 0, ...lazyCodeAST.program.body);
        routerConfigAST.program.body.splice(this.existLazy ? lastIndex - 1 : lastIndex, 0, ...importCodeAST.program.body);
    }
    /**
     * exist layout or page in the ImportDeclarations
     */
    existImport(list, name, type) {
        return list.some((item) => {
            if (name === item.name && type === item.type) {
                return true;
            }
            return false;
        });
    }
    /**
     * find last import index
     */
    findLastImportIndex(routerConfigAST) {
        let lastIndex = 0;
        routerConfigAST.program.body.forEach((item, index) => {
            if (item.type === 'ImportDeclaration') {
                if (this.existLazy) {
                    lastIndex = index + 2;
                }
                else {
                    lastIndex = index + 1;
                }
            }
        });
        return lastIndex;
    }
}
exports.default = Router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2FkYXB0ZXIvbW9kdWxlcy9yb3V0ZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBNkI7QUFDN0IseUJBQXlCO0FBQ3pCLHdDQUF3QztBQUN4Qyw4Q0FBdUM7QUFDdkMsZ0RBQXdDO0FBQ3hDLGtDQUFrQztBQUVsQyxxRUFBOEQ7QUFHOUQsTUFBTSxzQkFBc0IsR0FBRyxjQUFjLENBQUM7QUFDOUMsTUFBTSxnQkFBZ0IsR0FBRyxTQUFTLENBQUM7QUFDbkMsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDO0FBRS9CLE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUUzRyxNQUFxQixNQUFNO0lBZ0J6QixZQUFZLE1BQTBDO1FBUC9DLG1CQUFjLEdBQUcsZUFBZSxDQUFDO1FBRXhDLG9FQUFvRTtRQUM3RCxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUsxQixNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDckcsQ0FBQztJQUVPLFlBQVksQ0FBQyxJQUFZO1FBQy9CLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDeEIsMkJBQTJCLEVBQUUsSUFB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