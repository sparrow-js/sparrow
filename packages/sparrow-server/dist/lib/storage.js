"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const userHome = require("user-home");
// Note: why not use `import`
// ref: https://github.com/sindresorhus/conf
const Conf = require('conf');
const confPath = path.join(userHome, '.iceworks');
if (!fs.existsSync(confPath)) {
    mkdirp(confPath);
}
const schema = {
    lastDate3: {
        type: 'string',
        default: '',
    },
    workFolder: {
        type: 'string',
        default: userHome,
    },
    user: {
        type: 'object',
        default: {
            workId: '',
            name: '',
            avatarUrl: 'https://img.alicdn.com/tfs/TB1hjBJXLxj_uVjSZFqXXaboFXa-147-150.jpg',
            isLogin: false,
        },
    },
    project: {
        type: 'string',
        default: '',
    },
    projects: {
        type: 'array',
        default: [],
    },
    editor: {
        type: 'string',
        default: 'code',
    },
    locale: {
        type: 'string',
        default: 'zh-CN',
    },
    theme: {
        type: 'string',
        default: '@alifd/theme-iceworks-dark',
    },
    npmClient: {
        type: 'string',
        default: '',
    },
    registry: {
        type: 'string',
        default: 'https://registry.npm.taobao.org',
    },
    material: {
        type: 'array',
        default: [
            {
                official: true,
                name: '飞冰物料',
                type: 'react',
                source: 'http://ice.alicdn.com/assets/materials/react-materials.json',
            },
            {
                official: true,
                name: 'Vue 物料',
                type: 'vue',
                source: 'http://ice.alicdn.com/assets/materials/vue-materials.json',
            },
            {
                official: true,
                name: 'Cra 物料',
                type: 'cra',
                source: 'http://iceworks.oss-cn-hangzhou.aliyuncs.com/assets/cra-materials.json',
            },
        ],
    },
    oss: {
        type: 'array',
        default: [],
    },
    panelSettings: {
        type: 'array',
        default: [],
    },
};
exports.schema = schema;
exports.default = new Conf({
    schema,
    configName: 'db',
    cwd: confPath,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvc3RvcmFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFDN0IsaUNBQWlDO0FBQ2pDLHNDQUFzQztBQUV0Qyw2QkFBNkI7QUFDN0IsNENBQTRDO0FBQzVDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUU3QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUVsRCxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtJQUM1QixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDbEI7QUFFRCxNQUFNLE1BQU0sR0FBRztJQUNiLFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLEVBQUU7S0FDWjtJQUNELFVBQVUsRUFBRTtRQUNWLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLFFBQVE7S0FDbEI7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRTtZQUNQLE1BQU0sRUFBRSxFQUFFO1lBQ1YsSUFBSSxFQUFFLEVBQUU7WUFDUixTQUFTLEVBQ1Asb0VBQW9FO1lBQ3RFLE9BQU8sRUFBRSxLQUFLO1NBQ2Y7S0FDRjtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLEVBQUU7S0FDWjtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxPQUFPO1FBQ2IsT0FBTyxFQUFFLEVBQUU7S0FDWjtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLE1BQU07S0FDaEI7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxPQUFPO0tBQ2pCO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsNEJBQTRCO0tBQ3RDO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsRUFBRTtLQUNaO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsaUNBQWlDO0tBQzNDO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLE9BQU87UUFDYixPQUFPLEVBQUU7WUFDUDtnQkFDRSxRQUFRLEVBQUUsSUFBSTtnQkFDZCxJQUFJLEVBQUUsTUFBTTtnQkFDWixJQUFJLEVBQUUsT0FBTztnQkFDYixNQUFNLEVBQUUsNkRBQTZEO2FBQ3RFO1lBQ0Q7Z0JBQ0UsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsTUFBTSxFQUFFLDJEQUEyRDthQUNwRTtZQUNEO2dCQUNFLFFBQVEsRUFBRSxJQUFJO2dCQUNkLElBQUksRUFBRSxRQUFRO2dCQUNkLElBQUksRUFBRSxLQUFLO2dCQUNYLE1BQU0sRUFBRSx3RUFBd0U7YUFDakY7U0FDRjtLQUNGO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsSUFBSSxFQUFFLE9BQU87UUFDYixPQUFPLEVBQUUsRUFBRTtLQUNaO0lBQ0QsYUFBYSxFQUFFO1FBQ2IsSUFBSSxFQUFFLE9BQU87UUFDYixPQUFPLEVBQUUsRUFBRTtLQUNaO0NBQ0YsQ0FBQztBQUVPLHdCQUFNO0FBRWYsa0JBQWUsSUFBSSxJQUFJLENBQUM7SUFDdEIsTUFBTTtJQUNOLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLEdBQUcsRUFBRSxRQUFRO0NBQ2QsQ0FBQyxDQUFDIn0=