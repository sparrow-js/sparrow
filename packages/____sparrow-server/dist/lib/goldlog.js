"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise-native");
async function default_1(data) {
    try {
        const dataKeyArray = Object.keys(data);
        const gokey = dataKeyArray.reduce((finalStr, currentKey, index) => {
            const currentData = typeof data[currentKey] === 'string'
                ? data[currentKey]
                : JSON.stringify(data[currentKey]);
            return `${finalStr}${currentKey}=${currentData}${dataKeyArray.length - 1 === index ? '' : '&'}`;
        }, '');
        console.log('glodlog:', gokey);
        await request({
            method: 'post',
            url: 'http://gm.mmstat.com/iceteam.iceworks.log3',
            json: true,
            body: {
                cache: Math.random(),
                gmkey: 'CLK',
                gokey: encodeURIComponent(gokey),
                logtype: '2',
            },
        });
    }
    catch (error) {
        error.name = 'goldlog-error';
        console.error(error);
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29sZGxvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZ29sZGxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtEQUFrRDtBQUVuQyxLQUFLLG9CQUFVLElBQUk7SUFDaEMsSUFBSTtRQUNGLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsTUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDaEUsTUFBTSxXQUFXLEdBQ2IsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssUUFBUTtnQkFDbEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLE9BQU8sR0FBRyxRQUFRLEdBQUcsVUFBVSxJQUFJLFdBQVcsR0FDNUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQzNDLEVBQUUsQ0FBQztRQUNMLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVQLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRS9CLE1BQU0sT0FBTyxDQUFDO1lBQ1osTUFBTSxFQUFFLE1BQU07WUFDZCxHQUFHLEVBQUUsNENBQTRDO1lBQ2pELElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxFQUFFO2dCQUNKLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNwQixLQUFLLEVBQUUsS0FBSztnQkFDWixLQUFLLEVBQUUsa0JBQWtCLENBQUMsS0FBSyxDQUFDO2dCQUNoQyxPQUFPLEVBQUUsR0FBRzthQUNiO1NBQ0YsQ0FBQyxDQUFDO0tBQ0o7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLEtBQUssQ0FBQyxJQUFJLEdBQUcsZUFBZSxDQUFDO1FBQzdCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDdEI7QUFDSCxDQUFDO0FBOUJELDRCQThCQyJ9