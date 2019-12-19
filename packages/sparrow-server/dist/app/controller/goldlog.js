"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const midway_mirror_1 = require("midway-mirror");
const storage_1 = require("../../lib/storage");
const goldlog_1 = require("../../lib/goldlog");
const { checkAliInternal } = require('ice-npm-utils');
const packageJSON = require('../../../package.json');
let GoldlogController = class GoldlogController {
    async record(ctx) {
        if (ctx.request.body) {
            const data = ctx.request.body;
            await goldlog_1.default(data);
        }
        ctx.body = {
            success: true,
        };
    }
    async dau(ctx) {
        const isAlibaba = await checkAliInternal();
        const nowtDate = new Date().toDateString();
        const dauKey = 'lastDate3';
        const lastDate = storage_1.default.get(dauKey);
        const locale = storage_1.default.get('locale');
        const theme = storage_1.default.get('theme');
        if (nowtDate !== lastDate) {
            storage_1.default.set(dauKey, nowtDate);
            await goldlog_1.default({
                namespace: 'home',
                module: 'log',
                action: 'dau',
                data: {
                    group: isAlibaba ? 'alibaba' : 'outer',
                    locale,
                    theme,
                    version: packageJSON.version,
                },
            });
        }
        ctx.body = {
            success: true,
        };
    }
};
__decorate([
    midway_mirror_1.post('/record'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GoldlogController.prototype, "record", null);
__decorate([
    midway_mirror_1.post('/dau'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GoldlogController.prototype, "dau", null);
GoldlogController = __decorate([
    midway_mirror_1.provide(),
    midway_mirror_1.controller('/api/goldlog')
], GoldlogController);
exports.GoldlogController = GoldlogController;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29sZGxvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29udHJvbGxlci9nb2xkbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsaURBQTBEO0FBQzFELCtDQUF3QztBQUN4QywrQ0FBd0M7QUFFeEMsTUFBTSxFQUFFLGdCQUFnQixFQUFFLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3RELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBSXJELElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBR3JCLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRztRQUNyQixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO1lBQ3BCLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQzlCLE1BQU0saUJBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNyQjtRQUVELEdBQUcsQ0FBQyxJQUFJLEdBQUc7WUFDVCxPQUFPLEVBQUUsSUFBSTtTQUNkLENBQUM7SUFDSixDQUFDO0lBR00sS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHO1FBQ2xCLE1BQU0sU0FBUyxHQUFHLE1BQU0sZ0JBQWdCLEVBQUUsQ0FBQztRQUMzQyxNQUFNLFFBQVEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRTNDLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQztRQUMzQixNQUFNLFFBQVEsR0FBRyxpQkFBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQyxNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxNQUFNLEtBQUssR0FBRyxpQkFBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuQyxJQUFHLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDeEIsaUJBQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzlCLE1BQU0saUJBQU8sQ0FBQztnQkFDWixTQUFTLEVBQUUsTUFBTTtnQkFDakIsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTztvQkFDdEMsTUFBTTtvQkFDTixLQUFLO29CQUNMLE9BQU8sRUFBRSxXQUFXLENBQUMsT0FBTztpQkFDN0I7YUFDRixDQUFDLENBQUM7U0FDSjtRQUVELEdBQUcsQ0FBQyxJQUFJLEdBQUc7WUFDVCxPQUFPLEVBQUUsSUFBSTtTQUNkLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQXZDQztJQURDLG9CQUFJLENBQUMsU0FBUyxDQUFDOzs7OytDQVVmO0FBR0Q7SUFEQyxvQkFBSSxDQUFDLE1BQU0sQ0FBQzs7Ozs0Q0EyQlo7QUF6Q1UsaUJBQWlCO0lBRjdCLHVCQUFPLEVBQUU7SUFDVCwwQkFBVSxDQUFDLGNBQWMsQ0FBQztHQUNkLGlCQUFpQixDQTBDN0I7QUExQ1ksOENBQWlCO0FBMEM3QixDQUFDIn0=