"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adapter_1 = require("../adapter");
const configuration_1 = require("./modules/configuration");
const task_1 = require("./modules/task");
const page_1 = require("./modules/page");
exports.default = async (i18n) => {
    const baseAdapter = await adapter_1.default(i18n);
    const { Guide, Layout, Page: basePage, QuickDev, QuickBuild, Git, OSS, Todo, Dependency, Task: baseTask, Configuration: baseConfiguration, Router, Menu, } = baseAdapter;
    const adapter = {
        Guide,
        Layout,
        Git,
        OSS,
        Todo,
        Dependency,
        QuickDev,
        QuickBuild,
        Router,
        Menu,
        Page: Object.assign(Object.assign({}, basePage), { module: page_1.default }),
        Task: Object.assign(Object.assign({}, baseTask), { module: task_1.default }),
        Configuration: Object.assign(Object.assign({}, baseConfiguration), { module: configuration_1.default }),
    };
    return adapter;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2FkYXB0ZXItdnVlLXYyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esd0NBQXdDO0FBQ3hDLDJEQUFvRDtBQUNwRCx5Q0FBa0M7QUFDbEMseUNBQWtDO0FBRWxDLGtCQUFlLEtBQUssRUFBQyxJQUFJLEVBQUMsRUFBRTtJQUMxQixNQUFNLFdBQVcsR0FBRyxNQUFNLGlCQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0MsTUFBTSxFQUNKLEtBQUssRUFDTCxNQUFNLEVBQ04sSUFBSSxFQUFFLFFBQVEsRUFDZCxRQUFRLEVBQ1IsVUFBVSxFQUNWLEdBQUcsRUFDSCxHQUFHLEVBQ0gsSUFBSSxFQUNKLFVBQVUsRUFDVixJQUFJLEVBQUUsUUFBUSxFQUNkLGFBQWEsRUFBRSxpQkFBaUIsRUFDaEMsTUFBTSxFQUNOLElBQUksR0FDTCxHQUFHLFdBQVcsQ0FBQztJQUVoQixNQUFNLE9BQU8sR0FBRztRQUNkLEtBQUs7UUFDTCxNQUFNO1FBQ04sR0FBRztRQUNILEdBQUc7UUFDSCxJQUFJO1FBQ0osVUFBVTtRQUNWLFFBQVE7UUFDUixVQUFVO1FBQ1YsTUFBTTtRQUNOLElBQUk7UUFDSixJQUFJLGtDQUNDLFFBQVEsS0FDWCxNQUFNLEVBQUUsY0FBSSxHQUNiO1FBQ0QsSUFBSSxrQ0FDQyxRQUFRLEtBQ1gsTUFBTSxFQUFFLGNBQUksR0FDYjtRQUNELGFBQWEsa0NBQ1IsaUJBQWlCLEtBQ3BCLE1BQU0sRUFBRSx1QkFBYSxHQUN0QjtLQUNGLENBQUM7SUFFRixPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDLENBQUMifQ==