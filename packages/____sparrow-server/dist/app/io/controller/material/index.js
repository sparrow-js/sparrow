"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const rp = require("request-promise-native");
const ice_npm_utils_1 = require("ice-npm-utils");
const storage_1 = require("../../../../lib/storage");
const isArray = Array.isArray;
const RECOMMEND_SCAFFOLDS = [
    'ice-design-pro',
    'ice-design-lite',
];
const CATEGORY_ALL = '全部';
exports.default = (app) => {
    return class MaterialController extends app.Controller {
        async getResources({ args }) {
            const isAliInternal = await ice_npm_utils_1.checkAliInternal();
            let defaultMaterials = storage_1.schema.material.default;
            if (isAliInternal) {
                defaultMaterials = defaultMaterials.filter(item => item.type === 'react');
            }
            // check if the default official material is the same as the default in db.json
            const newMaterial = storage_1.default
                .get('material')
                .filter(item => !item.official)
                .concat(defaultMaterials);
            storage_1.default.set('material', newMaterial);
            const resources = storage_1.default.get('material');
            if (args && args.type) {
                return resources.filter(({ type: dataType }) => dataType === args.type);
            }
            return resources;
        }
        async getOne(ctx) {
            const { args: { url }, logger } = ctx;
            logger.info(`get material by url, url: ${url}`);
            const data = await request(url);
            // update material metadata.
            const allMaterials = storage_1.default.get('material');
            let currentIdx = -1;
            const currentItem = allMaterials.find((item, idx) => {
                if (item.source === url) {
                    currentIdx = idx;
                    return true;
                }
                return false;
            });
            const { description = currentItem.description, homepage = currentItem.homepage, logo = currentItem.logo, } = data;
            const newMaterialData = Object.assign(Object.assign({}, currentItem), { description,
                homepage,
                logo });
            // if the material has existed, update metadata
            if (currentIdx > -1) {
                const newMaterials = updateArrayItem(allMaterials, newMaterialData, currentIdx);
                storage_1.default.set('material', newMaterials);
            }
            return Object.assign(Object.assign({}, formatMaterialData(data)), { name: currentItem.name, official: currentItem.official });
        }
        async getRecommendScaffolds() {
            const officialMaterial = storage_1.schema.material.default[0];
            const { scaffolds = [] } = await request(officialMaterial.source);
            const recommendScaffolds = scaffolds.filter(({ name }) => RECOMMEND_SCAFFOLDS.includes(name));
            return recommendScaffolds;
        }
        async add(ctx) {
            const { args: { url, name }, logger } = ctx;
            const allMaterials = storage_1.default.get('material');
            const existed = allMaterials.some(m => m.source === url);
            if (existed) {
                logger.info(`current material has existed, source URL: ${url}`);
                throw Error('current material has existed.');
            }
            const data = await request(url);
            const { description, homepage, logo, type, source = url, } = data;
            // material's name is required
            if (!name) {
                logger.info(`material's name is required, source URL: ${url}`);
                throw Error('material\'s name is required.');
            }
            const material = storage_1.default.get('material');
            const currentItem = {
                official: false, name, description, homepage, logo, type, source,
            };
            const newMaterials = material.filter((item) => item.name !== currentItem.name);
            newMaterials.unshift(currentItem);
            storage_1.default.set('material', newMaterials);
            const materialData = formatMaterialData(data);
            return { resource: storage_1.default.get('material'), current: Object.assign(Object.assign({}, materialData), { name, official: currentItem.official }) };
        }
        async delete(ctx) {
            const { args: { url }, logger } = ctx;
            logger.info(`delete material, source URL: ${url}`);
            const material = storage_1.default.get('material');
            const newMaterials = material.filter(item => item.source !== url);
            storage_1.default.set('material', newMaterials);
            return storage_1.default.get('material');
        }
    };
};
function formatMaterialData(data) {
    const { blocks = [], scaffolds = [], components = [] } = data, other = __rest(data, ["blocks", "scaffolds", "components"]);
    return Object.assign(Object.assign({}, other), { blocks: { categories: generateCates(blocks), materials: formatMaterialsByCatrgory(blocks) }, scaffolds: { categories: generateCates(scaffolds), materials: formatMaterialsByCatrgory(scaffolds) }, components: { categories: generateCates(components), materials: formatMaterialsByCatrgory(components) } });
}
function generateCates(data) {
    const result = [{ name: CATEGORY_ALL, count: data.length }];
    const temp = {};
    for (let i = 0, l = data.length; i < l; i++) {
        const { categories } = data[i];
        if (isArray(categories) && categories.length) {
            categories && categories.forEach((catName) => {
                if (!(catName in temp)) {
                    temp[catName] = 1;
                }
                else {
                    temp[catName]++;
                }
            });
        }
    }
    Object.keys(temp).forEach((name) => {
        result.push({ name, count: temp[name] });
    });
    return result;
}
function formatMaterialsByCatrgory(data) {
    const materials = { [CATEGORY_ALL]: [] };
    if (isArray(data)) {
        data.forEach((item) => {
            const { categories } = item;
            materials[CATEGORY_ALL].push(item);
            if (isArray(categories) && categories.length) {
                categories.forEach((category) => {
                    if (isArray(materials[category])) {
                        materials[category].push(item);
                    }
                    else {
                        materials[category] = [item];
                    }
                });
            }
        });
    }
    return materials;
}
// http request function
const request = async (uri, options = {}) => {
    options = Object.assign({
        uri,
        json: true,
        rejectUnauthorized: false,
        headers: {
            'Cache-Control': 'no-cache',
        },
        timeout: 5000,
    }, options);
    return await rp(options);
};
const updateArrayItem = (array, item, itemIdx) => {
    return [
        ...array.slice(0, itemIdx),
        item,
        ...array.slice(itemIdx + 1),
    ];
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL2lvL2NvbnRyb2xsZXIvbWF0ZXJpYWwvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUE2QztBQUM3QyxpREFBaUQ7QUFDakQscURBQTBEO0FBRTFELE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7QUFFOUIsTUFBTSxtQkFBbUIsR0FBRztJQUMxQixnQkFBZ0I7SUFDaEIsaUJBQWlCO0NBQ2xCLENBQUM7QUFFRixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUM7QUFFMUIsa0JBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNyQixPQUFPLE1BQU0sa0JBQW1CLFNBQVEsR0FBRyxDQUFDLFVBQVU7UUFDN0MsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksRUFBRTtZQUNoQyxNQUFNLGFBQWEsR0FBRyxNQUFNLGdDQUFnQixFQUFFLENBQUM7WUFDL0MsSUFBSSxnQkFBZ0IsR0FBRyxnQkFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFDL0MsSUFBSSxhQUFhLEVBQUU7Z0JBQ2pCLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLENBQUM7YUFDM0U7WUFFRCwrRUFBK0U7WUFDL0UsTUFBTSxXQUFXLEdBQUcsaUJBQU87aUJBQ3hCLEdBQUcsQ0FBQyxVQUFVLENBQUM7aUJBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2lCQUM5QixNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUM1QixpQkFBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFFckMsTUFBTSxTQUFTLEdBQUcsaUJBQU8sQ0FB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