"use strict";
const path = require("path");
module.exports = {
    nunjucks: {
        enable: true,
        package: 'egg-view-nunjucks',
    },
    io: {
        enable: true,
        package: 'egg-socket.io',
    },
    cors: {
        enable: true,
        package: 'egg-cors',
    },
    projectManager: {
        enable: true,
        path: path.join(__dirname, '../lib/plugin/project-manager'),
    },
    i18n: {
        enable: true,
        path: path.join(__dirname, '../lib/plugin/i18n'),
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZy9wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDZCQUE2QjtBQUU3QixpQkFBUztJQUNQLFFBQVEsRUFBRTtRQUNSLE1BQU0sRUFBRSxJQUFJO1FBQ1osT0FBTyxFQUFFLG1CQUFtQjtLQUM3QjtJQUVELEVBQUUsRUFBRTtRQUNGLE1BQU0sRUFBRSxJQUFJO1FBQ1osT0FBTyxFQUFFLGVBQWU7S0FDekI7SUFFRCxJQUFJLEVBQUU7UUFDSixNQUFNLEVBQUUsSUFBSTtRQUNaLE9BQU8sRUFBRSxVQUFVO0tBQ3BCO0lBRUQsY0FBYyxFQUFFO1FBQ2QsTUFBTSxFQUFFLElBQUk7UUFDWixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsK0JBQStCLENBQUM7S0FDNUQ7SUFFRCxJQUFJLEVBQUU7UUFDSixNQUFNLEVBQUUsSUFBSTtRQUNaLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxvQkFBb0IsQ0FBQztLQUNqRDtDQUNGLENBQUMifQ==