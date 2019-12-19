"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const path = require("path");
const fs = require("fs-extra");
const storage_1 = require("../../storage");
const recursiveReaddir_1 = require("../../recursiveReaddir");
const zhCNGlobal = require("../../../locales/zh-CN.json");
const enUSGlobal = require("../../../locales/en-US.json");
const LIB_PATH = path.resolve(__dirname, '../../');
function ignoreFile(filePath) {
    return !_.includes(filePath, 'adapter');
}
class I18n {
    constructor() {
        this.localeMap = {
            'zh-CN': zhCNGlobal,
            'en-US': enUSGlobal,
        };
    }
    // read locale json file in adapter/locales
    async readLocales() {
        const adapterFiles = await recursiveReaddir_1.default(LIB_PATH, [ignoreFile]);
        const localeFiles = adapterFiles.filter(file => {
            return _.includes(file, 'locales') && path.extname(file) === '.json';
        });
        await Promise.all(localeFiles.map(async (file) => {
            const name = path.basename(file, '.json');
            const content = await fs.readJSON(file);
            this.localeMap[name] = Object.assign({}, this.localeMap[name], content);
        }));
    }
    format(localeKey, args) {
        const localeConfig = storage_1.default.get('locale');
        const localeTemplate = this.localeMap[localeConfig][localeKey];
        // template replace regex, example: 'hello { user }'
        _.templateSettings.interpolate = /{([\s\S]+?)}/g;
        return _.template(localeTemplate)(args);
    }
}
exports.default = (app) => {
    app.i18n = new I18n();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9wbHVnaW4vaTE4bi9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0QkFBNEI7QUFDNUIsNkJBQTZCO0FBQzdCLCtCQUErQjtBQUMvQiwyQ0FBb0M7QUFFcEMsNkRBQXNEO0FBRXRELDBEQUEwRDtBQUMxRCwwREFBMEQ7QUFFMUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFFbkQsU0FBUyxVQUFVLENBQUMsUUFBZ0I7SUFDbEMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQzFDLENBQUM7QUFFRCxNQUFNLElBQUk7SUFLUjtRQUNFLElBQUksQ0FBQyxTQUFTLEdBQUc7WUFDZixPQUFPLEVBQUUsVUFBVTtZQUNuQixPQUFPLEVBQUUsVUFBVTtTQUNwQixDQUFDO0lBQ0osQ0FBQztJQUVELDJDQUEyQztJQUNwQyxLQUFLLENBQUMsV0FBVztRQUN0QixNQUFNLFlBQVksR0FBYSxNQUFNLDBCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFFOUUsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM3QyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssT0FBTyxDQUFDO1FBQ3ZFLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFO1lBQy9DLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzFDLE1BQU0sT0FBTyxHQUFHLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV4QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDMUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7SUFFTSxNQUFNLENBQUMsU0FBaUIsRUFBRSxJQUFhO1FBQzVDLE1BQU0sWUFBWSxHQUFHLGlCQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTNDLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFL0Qsb0RBQW9EO1FBQ3BELENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsZUFBZSxDQUFDO1FBQ2pELE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0NBQ0Y7QUFFRCxrQkFBZSxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ3JCLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUN4QixDQUFDLENBQUMifQ==