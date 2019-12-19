"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adapter_1 = require("../../../adapter");
class Router extends adapter_1.baseModules.Router {
    constructor(params) {
        super(params);
        // cra only support 'src' as baseUrl, so the import dependency path has no prefix such as:
        // import foo from 'pages/foo';
        this.noPathPrefix = true;
    }
}
exports.default = Router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2FkYXB0ZXItY3JhLXYxL21vZHVsZXMvcm91dGVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQStDO0FBRS9DLE1BQXFCLE1BQU8sU0FBUSxxQkFBVyxDQUFDLE1BQU07SUFHcEQsWUFBWSxNQUFNO1FBQ2hCLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNkLDBGQUEwRjtRQUMxRiwrQkFBK0I7UUFDL0IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztDQUNGO0FBVEQseUJBU0MifQ==