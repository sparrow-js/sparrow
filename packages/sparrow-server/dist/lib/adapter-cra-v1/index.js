"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adapter_1 = require("../adapter");
const router_1 = require("./modules/router");
exports.default = async (i18n) => {
    const baseAdapter = await adapter_1.default(i18n);
    /* The configuration module is not used because the customized configuration provided by
    create-react-app is not supported in iceworks */
    const adapter = {
        Guide: baseAdapter.Guide,
        Layout: baseAdapter.Layout,
        Page: baseAdapter.Page,
        Menu: baseAdapter.Menu,
        QuickDev: baseAdapter.QuickDev,
        QuickBuild: baseAdapter.QuickBuild,
        Git: baseAdapter.Git,
        OSS: baseAdapter.OSS,
        Todo: baseAdapter.Todo,
        Dependency: baseAdapter.Dependency,
        Task: baseAdapter.Task,
        Router: Object.assign(Object.assign({}, baseAdapter.Router), { module: router_1.default }),
    };
    return adapter;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2FkYXB0ZXItY3JhLXYxL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsd0NBQXdDO0FBQ3hDLDZDQUFzQztBQUV0QyxrQkFBZSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDNUIsTUFBTSxXQUFXLEdBQUcsTUFBTSxpQkFBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRS9DO29EQUNnRDtJQUNoRCxNQUFNLE9BQU8sR0FBRztRQUNkLEtBQUssRUFBRSxXQUFXLENBQUMsS0FBSztRQUN4QixNQUFNLEVBQUUsV0FBVyxDQUFDLE1BQU07UUFDMUIsSUFBSSxFQUFFLFdBQVcsQ0FBQyxJQUFJO1FBQ3RCLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSTtRQUN0QixRQUFRLEVBQUUsV0FBVyxDQUFDLFFBQVE7UUFDOUIsVUFBVSxFQUFFLFdBQVcsQ0FBQyxVQUFVO1FBQ2xDLEdBQUcsRUFBRSxXQUFXLENBQUMsR0FBRztRQUNwQixHQUFHLEVBQUUsV0FBVyxDQUFDLEdBQUc7UUFDcEIsSUFBSSxFQUFFLFdBQVcsQ0FBQyxJQUFJO1FBQ3RCLFVBQVUsRUFBRSxXQUFXLENBQUMsVUFBVTtRQUNsQyxJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUk7UUFDdEIsTUFBTSxrQ0FDRCxXQUFXLENBQUMsTUFBTSxLQUNyQixNQUFNLEVBQUUsZ0JBQU0sR0FDZjtLQUNGLENBQUM7SUFFRixPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDLENBQUMifQ==