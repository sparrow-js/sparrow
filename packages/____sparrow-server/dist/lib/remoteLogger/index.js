"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const request = require("request-promise-native");
const egg_logger_1 = require("egg-logger");
const remoteUrl = `http://iceworks.cn-hangzhou.log.aliyuncs.com/logstores/iceworks-node-log/track`;
class RemoteLogger extends egg_logger_1.Transport {
    // send to remote
    async log(level, args) {
        const qsData = {
            APIVersion: '0.6.0',
            __topic__: level,
            node_version: process.version,
            message: '',
            name: '',
            stack: '',
        };
        if (args[0] instanceof Error) {
            const error = args[0];
            qsData.message = error.message;
            qsData.name = error.name;
            qsData.stack = error.stack;
        }
        else {
            const name = _.isString(args[0]) ? args[0] : JSON.stringify(args[0]);
            const message = args[1] ? JSON.stringify(args[1]) : '';
            qsData.name = name;
            qsData.message = message;
        }
        try {
            await request({
                url: remoteUrl,
                qs: qsData,
                timeout: 2000,
            });
        }
        catch (err) {
            // ignore...
        }
    }
}
exports.default = RemoteLogger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3JlbW90ZUxvZ2dlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRCQUE0QjtBQUM1QixrREFBa0Q7QUFDbEQsMkNBQXVDO0FBRXZDLE1BQU0sU0FBUyxHQUFHLGdGQUFnRixDQUFDO0FBRW5HLE1BQXFCLFlBQWEsU0FBUSxzQkFBUztJQUNqRCxpQkFBaUI7SUFDVixLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJO1FBQzFCLE1BQU0sTUFBTSxHQUFHO1lBQ2IsVUFBVSxFQUFFLE9BQU87WUFDbkIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsWUFBWSxFQUFFLE9BQU8sQ0FBQyxPQUFPO1lBRTdCLE9BQU8sRUFBRSxFQUFFO1lBQ1gsSUFBSSxFQUFFLEVBQUU7WUFDUixLQUFLLEVBQUUsRUFBRTtTQUNWLENBQUM7UUFFRixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxLQUFLLEVBQUU7WUFDNUIsTUFBTSxLQUFLLEdBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUMvQixNQUFNLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDekIsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1NBQzVCO2FBQU07WUFDTCxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckUsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDdkQsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDbkIsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7U0FDMUI7UUFFRCxJQUFJO1lBQ0YsTUFBTSxPQUFPLENBQUM7Z0JBQ1osR0FBRyxFQUFFLFNBQVM7Z0JBQ2QsRUFBRSxFQUFFLE1BQU07Z0JBQ1YsT0FBTyxFQUFFLElBQUk7YUFDZCxDQUFDLENBQUM7U0FDSjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osWUFBWTtTQUNiO0lBQ0gsQ0FBQztDQUNGO0FBbkNELCtCQW1DQyJ9