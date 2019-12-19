"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ice_npm_utils_1 = require("ice-npm-utils");
const adapter_1 = require("../adapter");
const configuration_1 = require("./modules/configuration");
const task_1 = require("./modules/task");
exports.default = async (i18n) => {
    const baseAdapter = await adapter_1.default(i18n);
    const { Guide, Layout, Git, OSS, Todo, Dependency, Task: baseTask, Configuration: baseConfiguration, } = baseAdapter;
    const adapter = {
        Guide,
        Layout,
        Git,
        OSS,
        Todo,
        Dependency,
        Task: Object.assign(Object.assign({}, baseTask), { module: task_1.default }),
        Configuration: Object.assign(Object.assign({}, baseConfiguration), { module: configuration_1.default }),
    };
    const isAliInternal = await ice_npm_utils_1.checkAliInternal();
    const filteredPanels = isAliInternal ? ['OSS'] : ['DEF'];
    Object.keys(adapter).forEach((name) => {
        if (filteredPanels.indexOf(name) > -1) {
            delete adapter[name];
        }
    });
    return adapter;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2FkYXB0ZXItdnVlLXYxL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQWlEO0FBQ2pELHdDQUF3QztBQUN4QywyREFBb0Q7QUFDcEQseUNBQWtDO0FBRWxDLGtCQUFlLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUM1QixNQUFNLFdBQVcsR0FBRyxNQUFNLGlCQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0MsTUFBTSxFQUNKLEtBQUssRUFDTCxNQUFNLEVBQ04sR0FBRyxFQUNILEdBQUcsRUFDSCxJQUFJLEVBQ0osVUFBVSxFQUNWLElBQUksRUFBRSxRQUFRLEVBQ2QsYUFBYSxFQUFFLGlCQUFpQixHQUNqQyxHQUFHLFdBQVcsQ0FBQztJQUVoQixNQUFNLE9BQU8sR0FBRztRQUNkLEtBQUs7UUFDTCxNQUFNO1FBQ04sR0FBRztRQUNILEdBQUc7UUFDSCxJQUFJO1FBQ0osVUFBVTtRQUNWLElBQUksa0NBQ0MsUUFBUSxLQUNYLE1BQU0sRUFBRSxjQUFJLEdBQ2I7UUFDRCxhQUFhLGtDQUNSLGlCQUFpQixLQUNwQixNQUFNLEVBQUUsdUJBQWEsR0FDdEI7S0FDRixDQUFDO0lBRUYsTUFBTSxhQUFhLEdBQUcsTUFBTSxnQ0FBZ0IsRUFBRSxDQUFDO0lBQy9DLE1BQU0sY0FBYyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6RCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3BDLElBQUksY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNyQyxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN0QjtJQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQyxDQUFDIn0=