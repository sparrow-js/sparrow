"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fsExtra = require("fs-extra");
const _ = require("lodash");
const prettier = require("prettier");
const parser = require("@babel/parser");
const traverse_1 = require("@babel/traverse");
const generator_1 = require("@babel/generator");
const t = require("@babel/types");
/**
 * merge default conf returns new conf
 * @param path the cli path, eg: ice.config.js
 * @param defaultConf
 */
function getCLIConf(path, defaultConf) {
    try {
        // Do not merge if there is no user specified config file
        if (path.length === 0) {
            return null;
        }
        const code = fsExtra.readFileSync(path, 'utf8');
        const ast = parser.parse(code, { sourceType: 'module' });
        const defaultConfKeys = defaultConf.map(item => item.name);
        const userConf = {};
        const visitor = {
            Identifier(path) {
                if (defaultConfKeys.includes(path.node.name)) {
                    userConf[path.node.name] = path.container.value.value;
                }
            },
        };
        traverse_1.default(ast, visitor);
        return mergeCLIConf(defaultConf, userConf);
    }
    catch (e) {
        console.error(e);
        return null;
    }
}
exports.getCLIConf = getCLIConf;
/**
 * set new conf
 * @param path the cli path, eg: ice.config.js
 * @param conf the current conf
 */
function setCLIConf(path, conf) {
    const confKeys = Object.keys(conf);
    const useConfContent = fsExtra.readFileSync(path, 'utf8');
    const ast = parser.parse(useConfContent, { sourceType: 'module' });
    let flag = false;
    let properties = [];
    // find object properties via ast
    const visitor = {
        ObjectExpression({ node }) {
            if (!flag) {
                properties = node.properties;
                flag = true;
            }
        },
    };
    // traverse ast
    traverse_1.default(ast, visitor);
    // compare user conf and project conf
    // modify the object if the conf exist
    // add a new object if the conf does not exist
    confKeys.forEach(key => {
        const node = properties.find((property) => property.key.name === key);
        if (node) {
            node.value.value = conf[key];
        }
        else {
            // distinguish between string and boolean
            // eg: { hash: true,  entry: 'src/index' }
            const value = (typeof conf[key] === 'boolean') ? t.booleanLiteral(conf[key]) : t.stringLiteral(conf[key]);
            properties.push(t.objectProperty(t.identifier(key), value));
        }
    });
    // generate and write new conf
    const newUserConf = generator_1.default(ast).code;
    const formatNewUserConf = prettier.format(newUserConf, {
        parser: 'babel',
        singleQuote: true,
        trailingComma: 'all',
    });
    fsExtra.writeFileSync(path, formatNewUserConf);
}
exports.setCLIConf = setCLIConf;
/**
 * merge default conf and user conf
 * @param defaultConf
 * @param userConf
 */
function mergeCLIConf(defaultConf, userConf) {
    return _.cloneDeepWith(defaultConf).map((item) => {
        if (Object.keys(userConf).includes(item.name)) {
            if (item.componentName === 'Switch') {
                item.componentProps.defaultChecked = JSON.parse(userConf[item.name]);
            }
            else {
                item.componentProps.placeholder = userConf[item.name].toString();
            }
        }
        return item;
    });
}
exports.mergeCLIConf = mergeCLIConf;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpQ29uZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvYWRhcHRlci91dGlscy9jbGlDb25mLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0NBQW9DO0FBQ3BDLDRCQUE0QjtBQUM1QixxQ0FBcUM7QUFDckMsd0NBQXdDO0FBQ3hDLDhDQUF1QztBQUN2QyxnREFBd0M7QUFDeEMsa0NBQWtDO0FBRWxDOzs7O0dBSUc7QUFDSCxTQUFTLFVBQVUsQ0FBQyxJQUFZLEVBQUUsV0FBVztJQUMzQyxJQUFJO1FBQ0YseURBQXlEO1FBQ3pELElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDckIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFFekQsTUFBTSxlQUFlLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUzRCxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDcEIsTUFBTSxPQUFPLEdBQUc7WUFDZCxVQUFVLENBQUMsSUFBSTtnQkFDYixJQUFJLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDNUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO2lCQUN2RDtZQUNILENBQUM7U0FDRixDQUFDO1FBRUYsa0JBQVEsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFF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