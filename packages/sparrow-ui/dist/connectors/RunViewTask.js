"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cwd = process.cwd();
const viewPath = cwd.split('sparrow-ui')[0] + 'sparrow-view';
exports.default = {
    id: viewPath,
    command: 'vue-cli-service serve --port 9000',
    path: viewPath
};
//# sourceMappingURL=RunViewTask.js.map