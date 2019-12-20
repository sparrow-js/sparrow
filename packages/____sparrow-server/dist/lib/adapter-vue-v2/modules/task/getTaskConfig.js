"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (ctx) => {
    const { i18n } = ctx;
    function addLabel(env, item) {
        item.label = i18n.format(`vueAdapter.task.${env}.${item.name}.label`);
        return item;
    }
    const dev = [
        {
            name: 'port',
            description: '',
            link: '',
            componentName: 'Input',
            componentProps: {
                placeholder: '4444',
            },
        },
        {
            name: 'host',
            description: '',
            link: '',
            componentName: 'Input',
            componentProps: {
                placeholder: '127.0.0.1',
            },
        },
        {
            name: 'https',
            description: '',
            link: '',
            componentName: 'Switch',
            componentProps: {
                defaultChecked: false,
            },
        },
    ];
    const build = [
        {
            name: 'outputDir',
            link: '',
            componentName: 'Input',
            componentProps: {
                placeholder: 'dist',
            },
        },
        {
            name: 'publicPath',
            link: '',
            componentName: 'Input',
            componentProps: {
                placeholder: '/',
            },
        },
        {
            name: 'filenameHashing',
            link: '',
            componentName: 'Switch',
            componentProps: {
                defaultChecked: true,
            },
        },
    ];
    const lint = [];
    dev.map((v) => addLabel('dev', v));
    build.map((v) => addLabel('build', v));
    return { dev, build, lint };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VGFza0NvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvYWRhcHRlci12dWUtdjIvbW9kdWxlcy90YXNrL2dldFRhc2tDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxrQkFBZSxDQUFDLEdBQWEsRUFBYSxFQUFFO0lBQzFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFFckIsU0FBUyxRQUFRLENBQUMsR0FBVyxFQUFFLElBQUk7UUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixHQUFHLElBQUksSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLENBQUM7UUFFdEUsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsTUFBTSxHQUFHLEdBQVE7UUFDZjtZQUNFLElBQUksRUFBRSxNQUFNO1lBQ1osV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsRUFBRTtZQUNSLGFBQWEsRUFBRSxPQUFPO1lBQ3RCLGNBQWMsRUFBRTtnQkFDZCxXQUFXLEVBQUUsTUFBTTthQUNwQjtTQUNGO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsTUFBTTtZQUNaLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLEVBQUU7WUFDUixhQUFhLEVBQUUsT0FBTztZQUN0QixjQUFjLEVBQUU7Z0JBQ2QsV0FBVyxFQUFFLFdBQVc7YUFDekI7U0FDRjtRQUNEO1lBQ0UsSUFBSSxFQUFFLE9BQU87WUFDYixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxFQUFFO1lBQ1IsYUFBYSxFQUFFLFFBQVE7WUFDdkIsY0FBYyxFQUFFO2dCQUNkLGNBQWMsRUFBRSxLQUFLO2FBQ3RCO1NBQ0Y7S0FDRixDQUFDO0lBRUYsTUFBTSxLQUFLLEdBQVE7UUFDakI7WUFDRSxJQUFJLEVBQUUsV0FBVztZQUNqQixJQUFJLEVBQUUsRUFBRTtZQUNSLGFBQWEsRUFBRSxPQUFPO1lBQ3RCLGNBQWMsRUFBRTtnQkFDZCxXQUFXLEVBQUUsTUFBTTthQUNwQjtTQUNGO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsWUFBWTtZQUNsQixJQUFJLEVBQUUsRUFBRTtZQUNSLGFBQWEsRUFBRSxPQUFPO1lBQ3RCLGNBQWMsRUFBRTtnQkFDZCxXQUFXLEVBQUUsR0FBRzthQUNqQjtTQUNGO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsaUJBQWlCO1lBQ3ZCLElBQUksRUFBRSxFQUFFO1lBQ1IsYUFBYSxFQUFFLFFBQVE7WUFDdkIsY0FBYyxFQUFFO2dCQUNkLGNBQWMsRUFBRSxJQUFJO2FBQ3JCO1NBQ0Y7S0FDRixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQVEsRUFBRSxDQUFDO0lBRXJCLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRCxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFcEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFDOUIsQ0FBQyxDQUFDIn0=