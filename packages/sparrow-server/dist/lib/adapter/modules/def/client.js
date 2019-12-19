"use strict";
/* eslint import/no-mutable-exports: 0, global-require: 0 */
Object.defineProperty(exports, "__esModule", { value: true });
let ClientWrap;
try {
    ClientWrap = require('@ali/def-pub-client');
}
catch (e) {
    ClientWrap = {
        Client: class C {
            run() {
                throw new Error('缺少 DEF 客户端依赖');
            }
        },
    };
}
exports.default = ClientWrap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9hZGFwdGVyL21vZHVsZXMvZGVmL2NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsNERBQTREOztBQUU1RCxJQUFJLFVBQVUsQ0FBQztBQUVmLElBQUk7SUFDRixVQUFVLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7Q0FDN0M7QUFBQyxPQUFPLENBQUMsRUFBRTtJQUNWLFVBQVUsR0FBRztRQUNYLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDTixHQUFHO2dCQUNSLE1BQU0sSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDbEMsQ0FBQztTQUNGO0tBQ0YsQ0FBQztDQUNIO0FBRUQsa0JBQWUsVUFBVSxDQUFDIn0=