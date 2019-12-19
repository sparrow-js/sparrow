"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const adapter_1 = require("../../../adapter");
const getConfigSchema_1 = require("./getConfigSchema");
class Configuration extends adapter_1.baseModules.Configuration {
    constructor(params) {
        super(params);
        this.cliConfFilename = 'vue.config.js';
        this.getConfigSchema = getConfigSchema_1.default;
        this.cliConfPath = path.join(this.project.path, this.cliConfFilename);
    }
}
exports.default = Configuration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2FkYXB0ZXItdnVlLXYxL21vZHVsZXMvY29uZmlndXJhdGlvbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE2QjtBQUM3Qiw4Q0FBK0M7QUFDL0MsdURBQWdEO0FBRWhELE1BQXFCLGFBQWMsU0FBUSxxQkFBVyxDQUFDLGFBQWE7SUFPbEUsWUFBWSxNQUFNO1FBQ2hCLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQVBULG9CQUFlLEdBQUcsZUFBZSxDQUFDO1FBRWxDLG9CQUFlLEdBQUcseUJBQWUsQ0FBQztRQU12QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7Q0FDRjtBQVhELGdDQVdDIn0=