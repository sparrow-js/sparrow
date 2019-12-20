"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @icedesign/base: 0.x
 * @alifd/next: 1.x
 * none: 1.x
 */
function getIceVersion(packageJSON) {
    const dependencies = packageJSON.dependencies || {};
    const hasIceDesignBase = dependencies['@icedesign/base'];
    return hasIceDesignBase ? '0.x' : '1.x';
}
exports.default = getIceVersion;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SWNlVmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvYWRhcHRlci91dGlscy9nZXRJY2VWZXJzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7R0FJRztBQUNILFNBQXdCLGFBQWEsQ0FBQyxXQUFXO0lBQy9DLE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDO0lBQ3BELE1BQU0sZ0JBQWdCLEdBQUcsWUFBWSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDekQsT0FBTyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDMUMsQ0FBQztBQUpELGdDQUlDIn0=