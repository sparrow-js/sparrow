"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const LineByLine = require("line-by-line");
const recursiveReaddir_1 = require("../../../recursiveReaddir");
async function matchFileContent(filePath) {
    const input = new LineByLine(filePath);
    let result = [];
    let currentFileLineNumber = 1;
    return new Promise((resolve) => {
        input.on('line', (line) => {
            if (line.length < 1000) {
                result = result.concat(retrieveMessagesFromLine(line, currentFileLineNumber));
            }
            currentFileLineNumber++;
        });
        input.on('end', () => {
            resolve(result);
        });
    });
}
function retrieveMessagesFromLine(lineString, lineNumber) {
    const result = [];
    const CHECK_PATTERN = ['NOTE', 'OPTIMIZE', 'TODO', 'HACK', 'FIXME'];
    CHECK_PATTERN.forEach(pattern => {
        // match rules：`// ${pattern} ${content}`  example: // FIXME something to do
        const reg = new RegExp(`(?:^|[^:])\\/[/*]\\s*${pattern}\\b\\s*(?:\\(([^:]*)\\))*\\s*:?\\s*(.*)`, 'i');
        const matchResults = lineString.match(reg);
        if (matchResults && matchResults.length) {
            const message = {
                content: '',
                type: pattern,
                line: lineNumber,
            };
            if (matchResults[2] && matchResults[2].length) {
                message.content = matchResults[2].trim();
            }
            result.push(message);
        }
    });
    return result;
}
class Todo {
    constructor(params) {
        this.project = params.project;
    }
    async getList() {
        const files = await recursiveReaddir_1.default(this.project.path);
        const result = [];
        await Promise.all(files.map(async (filePath) => {
            const messages = await matchFileContent(filePath);
            if (messages.length) {
                result.push({
                    messages,
                    path: path.relative(this.project.path, filePath),
                });
            }
        }));
        return result;
    }
}
exports.default = Todo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2FkYXB0ZXIvbW9kdWxlcy90b2RvL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTZCO0FBQzdCLDJDQUEyQztBQUUzQyxnRUFBeUQ7QUFFekQsS0FBSyxVQUFVLGdCQUFnQixDQUFDLFFBQWdCO0lBQzlDLE1BQU0sS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZDLElBQUksTUFBTSxHQUFlLEVBQUUsQ0FBQztJQUM1QixJQUFJLHFCQUFxQixHQUFHLENBQUMsQ0FBQztJQUU5QixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDN0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN4QixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxFQUFFO2dCQUN0QixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUscUJBQXFCLENBQUMsQ0FBQyxDQUFDO2FBQy9FO1lBRUQscUJBQXFCLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztRQUVILEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRTtZQUNuQixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFTLHdCQUF3QixDQUFDLFVBQVUsRUFBRSxVQUFVO0lBQ3RELE1BQU0sTUFBTSxHQUFlLEVBQUUsQ0FBQztJQUU5QixNQUFNLGFBQWEsR0FBRyxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUVwRSxhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzlCLDRFQUE0RTtRQUM1RSxNQUFNLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQyx3QkFBd0IsT0FBTyx5Q0FBeUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN0RyxNQUFNLFlBQVksR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTNDLElBQUksWUFBWSxJQUFJLFlBQVksQ0FBQyxNQUFNLEVBQUU7WUFDdkMsTUFBTSxPQUFPLEdBQWE7Z0JBQ3hCLE9BQU8sRUFBRSxFQUFFO2dCQUNYLElBQUksRUFBRSxPQUFPO2dCQUNiLElBQUksRUFBRSxVQUFVO2FBQ2pCLENBQUM7WUFFRixJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFO2dCQUM3QyxPQUFPLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUMxQztZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdEI7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFFRCxNQUFxQixJQUFJO0lBS3ZCLFlBQVksTUFBMEM7UUFDcEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2hDLENBQUM7SUFFTSxLQUFLLENBQUMsT0FBTztRQUNsQixNQUFNLEtBQUssR0FBYSxNQUFNLDBCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbEUsTUFBTSxNQUFNLEdBQVksRUFBRSxDQUFDO1FBQzNCLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRTtZQUM3QyxNQUFNLFFBQVEsR0FBZSxNQUFNLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlELElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtnQkFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDVixRQUFRO29CQUNSLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQztpQkFDakQsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRUosT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztDQUNGO0FBekJELHVCQXlCQyJ9