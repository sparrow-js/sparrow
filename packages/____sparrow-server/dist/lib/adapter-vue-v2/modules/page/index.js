"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const adapter_1 = require("../../../adapter");
class Page extends adapter_1.baseModules.Page {
    constructor(params) {
        super(params);
        this.templateFileName = 'template.vue';
        this.templateFilePath = path.join(__dirname, `${this.templateFileName}.ejs`);
        this.prettierParseType = 'vue';
    }
}
exports.default = Page;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2FkYXB0ZXItdnVlLXYyL21vZHVsZXMvcGFnZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE2QjtBQUM3Qiw4Q0FBK0M7QUFHL0MsTUFBcUIsSUFBSyxTQUFRLHFCQUFXLENBQUMsSUFBSTtJQU9oRCxZQUFZLE1BQTJDO1FBQ3JELEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVkLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxjQUFjLENBQUM7UUFDdkMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixNQUFNLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ2pDLENBQUM7Q0FDRjtBQWRELHVCQWNDIn0=