"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const cliConf_1 = require("../../utils/cliConf");
const getConfigSchema_1 = require("./getConfigSchema");
class Configuration {
    constructor(params) {
        this.cliConfFilename = 'ice.config.js';
        this.getConfigSchema = getConfigSchema_1.default;
        const { project, storage } = params;
        this.project = project;
        this.storage = storage;
        this.cliConfPath = path.join(this.project.path, this.cliConfFilename);
    }
    async getCLIConf(args, ctx) {
        return cliConf_1.getCLIConf(this.cliConfPath, this.getConfigSchema(ctx));
    }
    async setCLIConf(args) {
        return cliConf_1.setCLIConf(this.cliConfPath, args.options);
    }
}
exports.default = Configuration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2FkYXB0ZXIvbW9kdWxlcy9jb25maWd1cmF0aW9uL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTZCO0FBQzdCLGlEQUE2RDtBQUU3RCx1REFBZ0Q7QUFFaEQsTUFBcUIsYUFBYTtJQVdoQyxZQUFZLE1BQTBDO1FBSi9DLG9CQUFlLEdBQUcsZUFBZSxDQUFDO1FBRWxDLG9CQUFlLEdBQXFDLHlCQUFlLENBQUM7UUFHekUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsR0FBRyxNQUFNLENBQUM7UUFDcEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRU0sS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsR0FBRztRQUMvQixPQUFPLG9CQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVNLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBZ0I7UUFDdEMsT0FBTyxvQkFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3BELENBQUM7Q0FDRjtBQXpCRCxnQ0F5QkMifQ==