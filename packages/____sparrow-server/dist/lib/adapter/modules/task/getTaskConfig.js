"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (ctx) => {
    const { i18n } = ctx;
    function addLabel(env, item) {
        item.label = i18n.format(`baseAdapter.task.${env}.${item.name}.label`);
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
        {
            name: 'analyzer',
            description: '',
            link: '',
            componentName: 'Switch',
            componentProps: {
                defaultChecked: false,
            },
        },
        {
            name: 'disabled-reload',
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
            description: '',
            link: '',
            componentName: 'Input',
            componentProps: {
                placeholder: '/dist',
            },
        },
        {
            name: 'minify',
            description: '',
            link: '',
            componentName: 'Switch',
            componentProps: {
                defaultChecked: true,
            },
        },
        {
            name: 'hash',
            description: '',
            link: '',
            componentName: 'Switch',
            componentProps: {
                defaultChecked: false,
            },
        },
    ];
    const lint = [];
    dev.map((v) => addLabel('dev', v));
    build.map((v) => addLabel('build', v));
    return { dev, build, lint };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VGFza0NvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvYWRhcHRlci9tb2R1bGVzL3Rhc2svZ2V0VGFza0NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlLENBQUMsR0FBYSxFQUFhLEVBQUU7SUFDMUMsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQztJQUVyQixTQUFTLFFBQVEsQ0FBQyxHQUFXLEVBQUUsSUFBSTtRQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQztRQUV2RSxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxNQUFNLEdBQUcsR0FBUTtRQUNmO1lBQ0UsSUFBSSxFQUFFLE1BQU07WUFDWixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxFQUFFO1lBQ1IsYUFBYSxFQUFFLE9BQU87WUFDdEIsY0FBYyxFQUFFO2dCQUNkLFdBQVcsRUFBRSxNQUFNO2FBQ3BCO1NBQ0Y7UUFDRDtZQUNFLElBQUksRUFBRSxNQUFNO1lBQ1osV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsRUFBRTtZQUNSLGFBQWEsRUFBRSxPQUFPO1lBQ3RCLGNBQWMsRUFBRTtnQkFDZCxXQUFXLEVBQUUsV0FBVzthQUN6QjtTQUNGO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsT0FBTztZQUNiLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLEVBQUU7WUFDUixhQUFhLEVBQUUsUUFBUTtZQUN2QixjQUFjLEVBQUU7Z0JBQ2QsY0FBYyxFQUFFLEtBQUs7YUFDdEI7U0FDRjtRQUNEO1lBQ0UsSUFBSSxFQUFFLFVBQVU7WUFDaEIsV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsRUFBRTtZQUNSLGFBQWEsRUFBRSxRQUFRO1lBQ3ZCLGNBQWMsRUFBRTtnQkFDZCxjQUFjLEVBQUUsS0FBSzthQUN0QjtTQUNGO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsaUJBQWlCO1lBQ3ZCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLEVBQUU7WUFDUixhQUFhLEVBQUUsUUFBUTtZQUN2QixjQUFjLEVBQUU7Z0JBQ2QsY0FBYyxFQUFFLEtBQUs7YUFDdEI7U0FDRjtLQUNGLENBQUM7SUFFRixNQUFNLEtBQUssR0FBUTtRQUNqQjtZQUNFLElBQUksRUFBRSxXQUFXO1lBQ2pCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLEVBQUU7WUFDUixhQUFhLEVBQUUsT0FBTztZQUN0QixjQUFjLEVBQUU7Z0JBQ2QsV0FBVyxFQUFFLE9BQU87YUFDckI7U0FDRjtRQUNEO1lBQ0UsSUFBSSxFQUFFLFFBQVE7WUFDZCxXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxFQUFFO1lBQ1IsYUFBYSxFQUFFLFFBQVE7WUFDdkIsY0FBYyxFQUFFO2dCQUNkLGNBQWMsRUFBRSxJQUFJO2FBQ3JCO1NBQ0Y7UUFDRDtZQUNFLElBQUksRUFBRSxNQUFNO1lBQ1osV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsRUFBRTtZQUNSLGFBQWEsRUFBRSxRQUFRO1lBQ3ZCLGNBQWMsRUFBRTtnQkFDZCxjQUFjLEVBQUUsS0FBSzthQUN0QjtTQUNGO0tBQ0YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUVoQixHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXBELE9BQU8sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDO0FBQzlCLENBQUMsQ0FBQyJ9