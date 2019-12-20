"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const openFolder = require("open");
const launchEditor = require("launch-code-editor");
const storage_1 = require("../../../../lib/storage");
exports.default = (app) => {
    const { Controller } = app;
    // System capability
    return class SystemController extends Controller {
        async getPath({ args }) {
            return path.join(...args);
        }
        async openFolder(ctx) {
            const { args: { path } } = ctx;
            return await openFolder(path);
        }
        openEditor(ctx) {
            const { args: { path }, logger, socket } = ctx;
            const editor = storage_1.default.get('editor');
            logger.info('open editor:', path, editor);
            launchEditor(path, editor, (fileName, errorMsg) => {
                socket.emit('home.system.open.editor.data', errorMsg);
            });
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9pby9jb250cm9sbGVyL2hvbWUvc3lzdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTZCO0FBQzdCLG1DQUFtQztBQUNuQyxtREFBbUQ7QUFDbkQscURBQThDO0FBRTlDLGtCQUFlLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFDckIsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLEdBQUcsQ0FBQztJQUUzQixvQkFBb0I7SUFDcEIsT0FBTyxNQUFNLGdCQUFpQixTQUFRLFVBQVU7UUFDdkMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRTtZQUMzQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDO1FBRU0sS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHO1lBQ3pCLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQztZQUMvQixPQUFPLE1BQU0sVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFFTSxVQUFVLENBQUMsR0FBRztZQUNuQixNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQztZQUMvQyxNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDMUMsWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLEVBQUU7Z0JBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUMsOEJBQThCLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDeEQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUMsQ0FBQyJ9