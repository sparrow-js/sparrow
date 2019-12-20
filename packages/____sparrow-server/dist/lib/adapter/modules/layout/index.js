"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const scanDirectory_1 = require("../../../scanDirectory");
const DEFAULT_IMAGE = 'https://gw.alicdn.com/tfs/TB1Qby8ex9YBuNjy0FfXXXIsVXa-976-974.png';
class Layout {
    constructor(params) {
        const { project, storage } = params;
        this.project = project;
        this.storage = storage;
        this.path = path.join(this.project.path, 'src', 'layouts');
    }
    async scanLayout(ctx) {
        const { i18n } = ctx;
        const layoutDirs = await scanDirectory_1.default(this.path);
        return Promise.all(layoutDirs.map(async (dir) => {
            const fullPath = path.join(this.path, dir);
            const name = path.basename(fullPath);
            return {
                name,
                title: i18n.format('baseAdapter.layout.defaultTitle'),
                description: i18n.format('baseAdapter.layout.defaultDes', { name }),
                screenshot: DEFAULT_IMAGE,
                thumbnail: DEFAULT_IMAGE,
            };
        }));
    }
    async getAll(args, ctx) {
        return await this.scanLayout(ctx);
    }
    async getOne(layoutName, ctx) {
        const layouts = await this.getAll(null, ctx);
        const layout = layouts.find(({ name }) => name === layoutName);
        return layout;
    }
}
exports.default = Layout;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2FkYXB0ZXIvbW9kdWxlcy9sYXlvdXQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBNkI7QUFFN0IsMERBQW1EO0FBRW5ELE1BQU0sYUFBYSxHQUFHLG1FQUFtRSxDQUFDO0FBRTFGLE1BQXFCLE1BQU07SUFPekIsWUFBWSxNQUEwQztRQUNwRCxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFTyxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUc7UUFDMUIsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNyQixNQUFNLFVBQVUsR0FBRyxNQUFNLHVCQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xELE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FDaEIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDM0IsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDckMsT0FBTztnQkFDTCxJQUFJO2dCQUNKLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGlDQUFpQyxDQUFDO2dCQUNyRCxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQywrQkFBK0IsRUFBRSxFQUFDLElBQUksRUFBQyxDQUFDO2dCQUNqRSxVQUFVLEVBQUUsYUFBYTtnQkFDekIsU0FBUyxFQUFFLGFBQWE7YUFDekIsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBYTtRQUNyQyxPQUFPLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFrQixFQUFFLEdBQWE7UUFDbkQsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM3QyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxDQUFDO1FBQzdELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRjtBQXpDRCx5QkF5Q0MifQ==