"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ice_npm_utils_1 = require("ice-npm-utils");
function default_1() {
    return async function client(ctx, next) {
        if (String(ctx.path).indexOf('/api') === 0) {
            await next();
            return;
        }
        ctx.clientConfig = {
            // default use iceworks-client@latest
            clientPath: process.env.ICEWORKS_CORE_VERSION
                ? `https://unpkg.com/iceworks-client@${process.env.ICEWORKS_CORE_VERSION}/build/`
                : 'http://ice.alicdn.com/iceworks-client/assets/',
            socketUrl: `//127.0.0.1:${process.env.PORT}/`,
            apiUrl: `//127.0.0.1:${process.env.PORT}/api/`,
            isAliInternal: await ice_npm_utils_1.checkAliInternal(),
        };
        await next();
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9taWRkbGV3YXJlL2NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUFpRDtBQUVqRDtJQUNFLE9BQU8sS0FBSyxVQUFVLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSTtRQUNwQyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMxQyxNQUFNLElBQUksRUFBRSxDQUFDO1lBQ2IsT0FBTztTQUNSO1FBRUQsR0FBRyxDQUFDLFlBQVksR0FBRztZQUNqQixxQ0FBcUM7WUFDckMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCO2dCQUMzQyxDQUFDLENBQUMscUNBQXFDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLFNBQVM7Z0JBQ2pGLENBQUMsQ0FBQywrQ0FBK0M7WUFDbkQsU0FBUyxFQUFFLGVBQWUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUc7WUFDN0MsTUFBTSxFQUFFLGVBQWUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU87WUFDOUMsYUFBYSxFQUFFLE1BQU0sZ0NBQWdCLEVBQUU7U0FDeEMsQ0FBQztRQUVGLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFDZixDQUFDLENBQUM7QUFDSixDQUFDO0FBbkJELDRCQW1CQyJ9