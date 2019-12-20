"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const execa = require("execa");
const parseArgs_1 = require("./parseArgs");
const cwd = process.cwd();
const viewPath = cwd.split('sparrow-server')[0] + 'sparrow-view';
const task = {
    id: viewPath,
    command: 'vue-cli-service serve --port 9000',
    path: viewPath
};
function run() {
    let [command, ...args] = parseArgs_1.parseArgs(task.command);
    console.log('*************');
    console.log(task);
    const child = execa(command, args, {
        cwd: task.path,
        stdio: ['inherit', 'pipe', 'pipe'],
        shell: true
    });
    child.stdout.on('data', buffer => {
        console.log(buffer.toString());
    });
    child.stderr.on('data', buffer => {
        console.log(buffer.toString());
    });
}
exports.run = run;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuVmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL3J1blZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBK0I7QUFDL0IsMkNBQXNDO0FBRXRDLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUMxQixNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsY0FBYyxDQUFBO0FBRWhFLE1BQU0sSUFBSSxHQUFHO0lBQ1gsRUFBRSxFQUFFLFFBQVE7SUFDWixPQUFPLEVBQUUsbUNBQW1DO0lBQzVDLElBQUksRUFBRSxRQUFRO0NBQ2YsQ0FBQztBQUVGLFNBQWdCLEdBQUc7SUFDakIsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLHFCQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtRQUNqQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUk7UUFDZCxLQUFLLEVBQUUsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUNsQyxLQUFLLEVBQUUsSUFBSTtLQUNaLENBQUMsQ0FBQztJQUVILEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRTtRQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO0lBQ2hDLENBQUMsQ0FBQyxDQUFBO0lBQ0YsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDO0FBaEJELGtCQWdCQyJ9