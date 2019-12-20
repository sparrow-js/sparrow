"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const adapter_1 = require("../../../adapter");
const getTaskConfig_1 = require("./getTaskConfig");
class Task extends adapter_1.baseModules.Task {
    constructor(params) {
        super(params);
        this.cliConfFilename = 'vue.config.js';
        this.getTaskConfig = getTaskConfig_1.default;
        this.cliConfPath = path.join(this.project.path, this.cliConfFilename);
    }
}
exports.default = Task;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2FkYXB0ZXItdnVlLXYyL21vZHVsZXMvdGFzay9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE2QjtBQUM3Qiw4Q0FBK0M7QUFDL0MsbURBQTRDO0FBRTVDLE1BQXFCLElBQUssU0FBUSxxQkFBVyxDQUFDLElBQUk7SUFPaEQsWUFBWSxNQUFNO1FBQ2hCLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQVBULG9CQUFlLEdBQVcsZUFBZSxDQUFDO1FBSTFDLGtCQUFhLEdBQUcsdUJBQWEsQ0FBQztRQUluQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7Q0FDRjtBQVhELHVCQVdDIn0=