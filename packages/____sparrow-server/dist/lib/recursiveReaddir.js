"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isbinaryfile_1 = require("isbinaryfile");
const junk = require("junk");
const readdir = require("recursive-readdir");
function ignoreFile(filePath, stats) {
    return junk.is(filePath) || (!stats.isDirectory() && isbinaryfile_1.isBinaryFileSync(filePath));
}
async function default_1(filePath, ignores = []) {
    const combinedIgnores = ['node_modules', '.*', ignoreFile].concat(ignores);
    const files = await readdir(filePath, combinedIgnores);
    return files;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjdXJzaXZlUmVhZGRpci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvcmVjdXJzaXZlUmVhZGRpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtDQUFnRDtBQUNoRCw2QkFBNkI7QUFFN0IsNkNBQTZDO0FBSTdDLFNBQVMsVUFBVSxDQUFDLFFBQWdCLEVBQUUsS0FBZTtJQUNuRCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsSUFBSSwrQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ25GLENBQUM7QUFFYyxLQUFLLG9CQUFVLFFBQWdCLEVBQUUsVUFBcUIsRUFBRTtJQUNyRSxNQUFNLGVBQWUsR0FBRyxDQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNFLE1BQU0sS0FBSyxHQUFHLE1BQU0sT0FBTyxDQUFDLFFBQVEsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUV2RCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFMRCw0QkFLQyJ9