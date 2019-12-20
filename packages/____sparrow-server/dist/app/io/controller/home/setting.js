"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const storage_1 = require("../../../../lib/storage");
const scanDirectory_1 = require("../../../../lib/scanDirectory");
const getNpmClient_1 = require("../../../../lib/getNpmClient");
exports.default = (app) => {
    const { Controller, i18n, logger } = app;
    async function setWorkFolder(newWorkFolder) {
        const directories = await scanDirectory_1.default(newWorkFolder);
        storage_1.default.set('workFolder', newWorkFolder);
        return directories;
    }
    return class HomeController extends Controller {
        async getWorkFolder() {
            const workFolder = storage_1.default.get('workFolder');
            let directories = [];
            try {
                directories = await scanDirectory_1.default(workFolder);
            }
            catch (error) {
                logger.warn('scanDirectory got error:', error);
            }
            return {
                path: workFolder,
                directories,
            };
        }
        async setWorkFolderBySub({ args }) {
            const { subDirectory } = args;
            const workFolder = storage_1.default.get('workFolder');
            const newWorkFolder = path.join(workFolder, subDirectory);
            const directories = await setWorkFolder(newWorkFolder);
            return {
                path: newWorkFolder,
                directories,
            };
        }
        async setWorkFolder({ args }) {
            const { path } = args;
            const directories = await setWorkFolder(path);
            return {
                path,
                directories,
            };
        }
        async setLocale(ctx) {
            const { projectManager, logger } = app;
            try {
                const project = await projectManager.getCurrent();
                // Refresh adapter's locale
                await project.reloadAdapter();
            }
            catch (error) {
                logger.error(error);
            }
            storage_1.default.set('locale', ctx.args.locale);
        }
        async getLocale() {
            return '1111';
        }
        async setTheme(ctx) {
            storage_1.default.set('theme', ctx.args.theme);
        }
        async getTheme() {
            return storage_1.default.get('theme');
        }
        async setEditor(ctx) {
            storage_1.default.set('editor', ctx.args.editor);
        }
        async getEditor() {
            return storage_1.default.get('editor');
        }
        async setNpmClient(ctx) {
            storage_1.default.set('npmClient', ctx.args.npmClient);
        }
        async getNpmClient() {
            const npmClient = await getNpmClient_1.default();
            // get origin value
            return npmClient[2];
        }
        async setRegistry(ctx) {
            storage_1.default.set('registry', ctx.args.registry);
        }
        async getRegistry() {
            return storage_1.default.get('registry');
        }
        async setUser({ args }) {
            const { name, workId, avatarUrl } = args;
            if (workId && name && avatarUrl) {
                storage_1.default.set('user', { name, workId, avatarUrl, isLogin: true });
            }
            else {
                throw new Error(i18n.format('controller.home.userError'));
            }
            return storage_1.default.get('user');
        }
        async getUser() {
            return storage_1.default.get('user');
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvaW8vY29udHJvbGxlci9ob21lL3NldHRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBNkI7QUFDN0IscURBQThDO0FBQzlDLGlFQUEwRDtBQUMxRCwrREFBd0Q7QUFFeEQsa0JBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNyQixNQUFNLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFFekMsS0FBSyxVQUFVLGFBQWEsQ0FBQyxhQUFhO1FBQ3hDLE1BQU0sV0FBVyxHQUFHLE1BQU0sdUJBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2RCxpQkFBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDekMsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztJQUVELE9BQU8sTUFBTSxjQUFlLFNBQVEsVUFBVTtRQUNyQyxLQUFLLENBQUMsYUFBYTtZQUN4QixNQUFNLFVBQVUsR0FBRyxpQkFBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM3QyxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFFckIsSUFBSTtnQkFDRixXQUFXLEdBQUcsTUFBTSx1QkFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQy9DO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNoRDtZQUVELE9BQU87Z0JBQ0wsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLFdBQVc7YUFDWixDQUFDO1FBQ0osQ0FBQztRQUVNLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLElBQUksRUFBRTtZQUN0QyxNQUFNLEVBQUUsWUFBWSxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBRTlCLE1BQU0sVUFBVSxHQUFH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