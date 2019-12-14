"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cwd = process.cwd();
function install() {
    return cwd.split('sparrow-ui')[0] + 'sparrow-view';
}
exports.install = install;
exports.default = {
    id: cwd.split('sparrow-ui')[0] + 'sparrow-view',
    command: 'vue-cli-service serve'
};
//# sourceMappingURL=view.js.map