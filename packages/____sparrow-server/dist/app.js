"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const remoteLogger_1 = require("./lib/remoteLogger");
const runView_1 = require("./util/runView");
runView_1.run();
class AppBootHook {
    constructor(app) {
        this.app = app;
    }
    async didLoad() {
        // send server log to remote in production
        if (this.app.config.env === 'prod') {
            this.app.getLogger().set('remote', new remoteLogger_1.default({ level: 'INFO' }));
        }
    }
}
exports.default = AppBootHook;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFEQUE4QztBQUM5Qyw0Q0FBbUM7QUFDbkMsYUFBRyxFQUFFLENBQUM7QUFFTixNQUFxQixXQUFXO0lBRzlCLFlBQVksR0FBRztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2pCLENBQUM7SUFFTSxLQUFLLENBQUMsT0FBTztRQUNsQiwwQ0FBMEM7UUFDMUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssTUFBTSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLHNCQUFZLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3pFO0lBQ0gsQ0FBQztDQUNGO0FBYkQsOEJBYUMifQ==