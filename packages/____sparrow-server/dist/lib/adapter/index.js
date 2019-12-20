"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const page_1 = require("./modules/page");
const dependency_1 = require("./modules/dependency");
const configuration_1 = require("./modules/configuration");
const task_1 = require("./modules/task");
const layout_1 = require("./modules/layout");
const menu_1 = require("./modules/menu");
const router_1 = require("./modules/router");
const git_1 = require("./modules/git");
const def_1 = require("./modules/def");
const oss_1 = require("./modules/oss");
const todo_1 = require("./modules/todo");
const zhCN = require("./locales/zh-CN.json");
const enUS = require("./locales/en-US.json");
exports.locales = {
    zhCN,
    enUS,
};
exports.baseModules = {
    Page: page_1.default,
    Dependency: dependency_1.default,
    Configuration: configuration_1.default,
    Task: task_1.default,
    Layout: layout_1.default,
    Menu: menu_1.default,
    Router: router_1.default,
    Git: git_1.default,
    DEF: def_1.default,
    OSS: oss_1.default,
    Todo: todo_1.default,
};
exports.default = async (i18n) => {
    const adapter = {
        Guide: {
            cover: 'https://img.alicdn.com/tfs/TB1CDlTdEKF3KVjSZFEXXXExFXa-300-300.png',
            isAvailable: true,
            module: null,
        },
        QuickDev: {
            cover: 'https://img.alicdn.com/tfs/TB1hcJCe.uF3KVjSZK9XXbVtXXa-300-300.png',
            isAvailable: true,
            module: null,
        },
        Dependency: {
            cover: 'https://img.alicdn.com/tfs/TB1nPY8c21H3KVjSZFBXXbSMXXa-300-300.png',
            isAvailable: true,
            module: dependency_1.default,
        },
        Page: {
            cover: 'https://img.alicdn.com/tfs/TB1Vl4javBj_uVjSZFpXXc0SXXa-300-300.png',
            isAvailable: true,
            module: page_1.default,
        },
        Layout: {
            cover: 'https://img.alicdn.com/tfs/TB1KUD8c4iH3KVjSZPfXXXBiVXa-300-300.png',
            isAvailable: false,
            module: layout_1.default,
        },
        Router: {
            cover: 'https://img.alicdn.com/tfs/TB1mZ.Xc8GE3KVjSZFhXXckaFXa-300-300.png',
            isAvailable: false,
            module: router_1.default,
        },
        Menu: {
            cover: 'https://img.alicdn.com/tfs/TB1mZ.Xc8GE3KVjSZFhXXckaFXa-300-300.png',
            isAvailable: false,
            module: menu_1.default,
        },
        QuickBuild: {
            cover: 'https://img.alicdn.com/tfs/TB1P8pAe79E3KVjSZFGXXc19XXa-300-300.png',
            isAvailable: false,
            module: null,
        },
        Git: {
            cover: 'https://img.alicdn.com/tfs/TB1GVb_c79E3KVjSZFGXXc19XXa-300-300.png',
            isAvailable: false,
            module: git_1.default,
        },
        OSS: {
            cover: 'https://img.alicdn.com/tfs/TB1mZ.Xc8GE3KVjSZFhXXckaFXa-300-300.png',
            isAvailable: false,
            module: oss_1.default,
        },
        DEF: {
            cover: 'https://img.alicdn.com/tfs/TB1qDkAXMFY.1VjSZFnXXcFHXXa-300-300.png',
            isAvailable: false,
            module: def_1.default,
        },
        Todo: {
            cover: 'https://img.alicdn.com/tfs/TB1zZJKdEGF3KVjSZFmXXbqPXXa-300-300.png',
            isAvailable: false,
            module: todo_1.default,
        },
        Task: {
            cover: '',
            isAvailable: true,
            module: task_1.default,
        },
        Configuration: {
            cover: '',
            isAvailable: true,
            module: configuration_1.default,
        },
    };
    _.forEach(adapter, (config, name) => {
        config.title = i18n.format(`baseAdapter.config.${name}.title`);
        config.description = i18n.format(`baseAdapter.config.${name}.des`);
    });
    return adapter;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2FkYXB0ZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0QkFBNEI7QUFDNUIseUNBQWtDO0FBQ2xDLHFEQUE4QztBQUM5QywyREFBb0Q7QUFDcEQseUNBQWtDO0FBQ2xDLDZDQUFzQztBQUN0Qyx5Q0FBa0M7QUFDbEMsNkNBQXNDO0FBQ3RDLHVDQUFnQztBQUNoQyx1Q0FBZ0M7QUFDaEMsdUNBQWdDO0FBQ2hDLHlDQUFrQztBQUdsQyw2Q0FBNkM7QUFDN0MsNkNBQTZDO0FBRWhDLFFBQUEsT0FBTyxHQUFHO0lBQ3JCLElBQUk7SUFDSixJQUFJO0NBQ0wsQ0FBQztBQUVXLFFBQUEsV0FBVyxHQUFHO0lBQ3pCLElBQUksRUFBSixjQUFJO0lBQ0osVUFBVSxFQUFWLG9CQUFVO0lBQ1YsYUFBYSxFQUFiLHVCQUFhO0lBQ2IsSUFBSSxFQUFKLGNBQUk7SUFDSixNQUFNLEVBQU4sZ0JBQU07SUFDTixJQUFJLEVBQUosY0FBSTtJQUNKLE1BQU0sRUFBTixnQkFBTTtJQUNOLEdBQUcsRUFBSCxhQUFHO0lBQ0gsR0FBRyxFQUFILGFBQUc7SUFDSCxHQUFHLEVBQUgsYUFBRztJQUNILElBQUksRUFBSixjQUFJO0NBQ0wsQ0FBQztBQUVGLGtCQUFlLEtBQUssRUFBRSxJQUFXLEVBQUUsRUFBRTtJQUNuQyxNQUFNLE9BQU8sR0FBUTtRQUNuQixLQUFLLEVBQUU7WUFDTCxLQUFLLEVBQUUsb0VBQW9FO1lBQzNFLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLE1BQU0sRUFBRSxJQUFJO1NBQ2I7UUFDRCxRQUFRLEVBQUU7WUFDUixLQUFLLEVBQUUsb0VBQW9FO1lBQzNFLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLE1BQU0sRUFBRSxJQUFJO1NBQ2I7UUFDRCxVQUFVLEVBQUU7WUFDVixLQUFLLEVBQUUsb0VBQW9FO1lBQzNFLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLE1BQU0sRUFBRSxvQkFBVTtTQUNuQjtRQUNELElBQUksRUFBRTtZQUNKLEtBQUssRUFBRSxvRUFBb0U7WUFDM0UsV0FBVyxFQUFFLElBQUk7WUFDakIsTUFBTSxFQUFFLGNBQUk7U0FDYjtRQUNELE1BQU0sRUFBRTtZQUNOLEtBQUssRUFBRSxvRUFBb0U7WUFDM0UsV0FBVyxFQUFFLEtBQUs7WUFDbEIsTUFBTSxFQUFFLGdCQUFNO1NBQ2Y7UUFDRCxNQUFNLEVBQUU7WUFDTixLQUFLLEVBQUUsb0VBQW9FO1lBQzNFLFdBQVcsRUFBRSxLQUFLO1lBQ2xCLE1BQU0sRUFBRSxnQkFBTTtTQUNmO1FBQ0QsSUFBSSxFQUFFO1lBQ0osS0FBSyxFQUFFLG9FQUFvRTtZQUMzRSxXQUFXLEVBQUUsS0FBSztZQUNsQixNQUFNLEVBQUUsY0FBSTtTQUNiO1FBQ0QsVUFBVSxFQUFFO1lBQ1YsS0FBSyxFQUFFLG9FQUFvRTtZQUMzRSxXQUFXLEVBQUUsS0FBSztZQUNsQixNQUFNLEVBQUUsSUFBSTtTQUNiO1FBQ0QsR0FBRyxFQUFFO1lBQ0gsS0FBSyxFQUFFLG9FQUFvRTtZQUMzRSxXQUFXLEVBQUUsS0FBSztZQUNsQixNQUFNLEVBQUUsYUFBRztTQUNaO1FBQ0QsR0FBRyxFQUFFO1lBQ0gsS0FBSyxFQUFFLG9FQUFvRTtZQUMzRSxXQUFXLEVBQUUsS0FBSztZQUNsQixNQUFNLEVBQUUsYUFBRztTQUNaO1FBQ0QsR0FBRyxFQUFFO1lBQ0gsS0FBSyxFQUFFLG9FQUFvRTtZQUMzRSxXQUFXLEVBQUUsS0FBSztZQUNsQixNQUFNLEVBQUUsYUFBRztTQUNaO1FBQ0QsSUFBSSxFQUFFO1lBQ0osS0FBSyxFQUFFLG9FQUFvRTtZQUMzRSxXQUFXLEVBQUUsS0FBSztZQUNsQixNQUFNLEVBQUUsY0FBSTtTQUNiO1FBQ0QsSUFBSSxFQUFFO1lBQ0osS0FBSyxFQUFFLEVBQUU7WUFDVCxXQUFXLEVBQUUsSUFBSTtZQUNqQixNQUFNLEVBQUUsY0FBSTtTQUNiO1FBQ0QsYUFBYSxFQUFFO1lBQ2IsS0FBSyxFQUFFLEVBQUU7WUFDVCxXQUFXLEVBQUUsSUFBSTtZQUNqQixNQUFNLEVBQUUsdUJBQWE7U0FDdEI7S0FDRixDQUFDO0lBRUYsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDbEMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixJQUFJLFFBQVEsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsSUFBSSxNQUFNLENBQUMsQ0FBQztJQUNyRSxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMsQ0FBQyJ9