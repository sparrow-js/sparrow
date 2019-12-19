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
let HomeController = class HomeController {
    async render(ctx) {
        await ctx.render('index.html');
        await ctx.render('index.html', ctx.clientConfig);
    }
};
__decorate([
    midway_mirror_1.get('*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "render", null);
HomeController = __decorate([
    midway_mirror_1.provide(),
    midway_mirror_1.controller('/')
], HomeController);
exports.HomeController = HomeController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29udHJvbGxlci9ob21lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsaURBQXlEO0FBSXpELElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFHbEIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHO1FBQ3JCLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMvQixNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNuRCxDQUFDO0NBQ0YsQ0FBQTtBQUpDO0lBREMsbUJBQUcsQ0FBQyxHQUFHLENBQUM7Ozs7NENBSVI7QUFOVSxjQUFjO0lBRjFCLHVCQUFPLEVBQUU7SUFDVCwwQkFBVSxDQUFDLEdBQUcsQ0FBQztHQUNILGNBQWMsQ0FPMUI7QUFQWSx3Q0FBYyJ9