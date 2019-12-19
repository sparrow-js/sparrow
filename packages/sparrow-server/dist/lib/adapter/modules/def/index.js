"use strict";
/* eslint @typescript-eslint/camelcase: 0 */
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
const isDev = process.env.NODE_ENV === 'local';
// DEF Token for iceworks client
const token = isDev
    ? 'f87bf958ad0ecb310b86b1536746b5209799902b1f556850f1a29f26a2375f28'
    : '72d7d45ac4495e9fb0047a96579a9af886e5c869f8ae148b68957c543d49ada1';
const env = isDev ? 'daily' : 'prod';
class DEF {
    constructor(params) {
        const { project, storage } = params;
        this.project = project;
        this.storage = storage;
    }
    async push(params, ctx) {
        const { target, commitId, branch, repository, empId } = params;
        const client = new client_1.default.Client();
        client.run({
            hideBuildMessage: true,
            client_token: token,
            client_emp_id: empId,
            target,
            repo: repository,
            branch,
            commit_id: commitId,
            env,
        });
        client.on('start', () => {
            ctx.socket.emit('adapter.def.push.start');
        });
        client.on('message', (message) => {
            ctx.socket.emit('adapter.def.push.data', `${message}\n\r`);
        });
        client.on('build_message', (message) => {
            ctx.socket.emit('adapter.def.push.data', message);
        });
        client.on('error', (error) => {
            ctx.socket.emit('adapter.def.push.data', `\r\n${error.message}`);
            ctx.socket.emit('adapter.def.push.exit', 1);
        });
        client.on('success', () => {
            ctx.socket.emit('adapter.def.push.exit', 0);
        });
    }
}
exports.default = DEF;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2FkYXB0ZXIvbW9kdWxlcy9kZWYvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDRDQUE0Qzs7QUFFNUMscUNBQThCO0FBRzlCLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQztBQUUvQyxnQ0FBZ0M7QUFDaEMsTUFBTSxLQUFLLEdBQUcsS0FBSztJQUNqQixDQUFDLENBQUMsa0VBQWtFO0lBQ3BFLENBQUMsQ0FBQyxrRUFBa0UsQ0FBQztBQUN2RSxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0FBRXJDLE1BQXFCLEdBQUc7SUFLdEIsWUFBWSxNQUEwQztRQUNwRCxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDO0lBRU0sS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFzQixFQUFFLEdBQWE7UUFDckQsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsR0FBRyxNQUFNLENBQUM7UUFDL0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxnQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDVCxnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLFlBQVksRUFBRSxLQUFLO1lBQ25CLGFBQWEsRUFBRSxLQUFLO1lBQ3BCLE1BQU07WUFDTixJQUFJLEVBQUUsVUFBVTtZQUNoQixNQUFNO1lBQ04sU0FBUyxFQUFFLFFBQVE7WUFDbkIsR0FBRztTQUNKLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtZQUN0QixHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUMvQixHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLE9BQU8sTUFBTSxDQUFDLENBQUM7UUFDN0QsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3JDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BELENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUMzQixHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxPQUFPLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQ2pFLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ3hCLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBMUNELHNCQTBDQyJ9