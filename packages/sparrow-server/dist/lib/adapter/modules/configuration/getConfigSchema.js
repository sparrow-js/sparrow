"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (ctx) => {
    const { i18n } = ctx;
    const result = [
        {
            name: 'entry',
            link: 'https://ice.work/docs/cli/config/config#entry',
            componentName: 'Input',
            componentProps: {
                placeholder: 'src/index.js',
            },
        },
        {
            name: 'outputDir',
            link: 'https://ice.work/docs/cli/config/config#outputDir',
            componentName: 'Input',
            componentProps: {
                placeholder: 'dist',
            },
        },
        {
            name: 'publicPath',
            link: 'https://ice.work/docs/cli/config/config#publicPath',
            componentName: 'Input',
            componentProps: {
                placeholder: '/',
            },
        },
        {
            name: 'devPublicPath',
            link: 'https://ice.work/docs/cli/config/config#devPublicPath',
            componentName: 'Input',
            componentProps: {
                placeholder: 'http://127.0.0.1',
            },
        },
        {
            name: 'injectBabel',
            link: 'https://ice.work/docs/cli/config/config#injectBabel',
            componentName: 'Select',
            componentProps: {
                placeholder: 'polyfill',
                dataSource: [
                    { label: 'runtime', value: 'runtime' },
                    { label: 'polyfill', value: 'polyfill' },
                ],
            },
        },
        {
            name: 'hash',
            link: 'https://ice.work/docs/cli/config/config#hash',
            componentName: 'Switch',
            componentProps: {
                defaultChecked: false,
            },
        },
        {
            name: 'minify',
            link: 'https://ice.work/docs/cli/config/config#minify',
            componentName: 'Switch',
            componentProps: {
                defaultChecked: false,
            },
        },
        {
            name: 'vendor',
            link: 'https://ice.work/docs/cli/config/config#vendor',
            componentName: 'Switch',
            componentProps: {
                defaultChecked: false,
            },
        },
    ];
    return result.map((v) => {
        v.label = i18n.format(`baseAdapter.configuration.${v.name}.label`);
        v.description = i18n.format(`baseAdapter.configuration.${v.name}.des`);
        return v;
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Q29uZmlnU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9hZGFwdGVyL21vZHVsZXMvY29uZmlndXJhdGlvbi9nZXRDb25maWdTY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxrQkFBZSxDQUFDLEdBQWEsRUFBaUIsRUFBRTtJQUM5QyxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDO0lBRXJCLE1BQU0sTUFBTSxHQUFVO1FBQ3BCO1lBQ0UsSUFBSSxFQUFFLE9BQU87WUFDYixJQUFJLEVBQUUsK0NBQStDO1lBQ3JELGFBQWEsRUFBRSxPQUFPO1lBQ3RCLGNBQWMsRUFBRTtnQkFDZCxXQUFXLEVBQUUsY0FBYzthQUM1QjtTQUNGO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsV0FBVztZQUNqQixJQUFJLEVBQUUsbURBQW1EO1lBQ3pELGFBQWEsRUFBRSxPQUFPO1lBQ3RCLGNBQWMsRUFBRTtnQkFDZCxXQUFXLEVBQUUsTUFBTTthQUNwQjtTQUNGO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsWUFBWTtZQUNsQixJQUFJLEVBQUUsb0RBQW9EO1lBQzFELGFBQWEsRUFBRSxPQUFPO1lBQ3RCLGNBQWMsRUFBRTtnQkFDZCxXQUFXLEVBQUUsR0FBRzthQUNqQjtTQUNGO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsZUFBZTtZQUNyQixJQUFJLEVBQUUsdURBQXVEO1lBQzdELGFBQWEsRUFBRSxPQUFPO1lBQ3RCLGNBQWMsRUFBRTtnQkFDZCxXQUFXLEVBQUUsa0JBQWtCO2FBQ2hDO1NBQ0Y7UUFDRDtZQUNFLElBQUksRUFBRSxhQUFhO1lBQ25CLElBQUksRUFBRSxxREFBcUQ7WUFDM0QsYUFBYSxFQUFFLFFBQVE7WUFDdkIsY0FBYyxFQUFFO2dCQUNkLFdBQVcsRUFBRSxVQUFVO2dCQUN2QixVQUFVLEVBQUU7b0JBQ1YsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7b0JBQ3RDLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFO2lCQUN6QzthQUNGO1NBQ0Y7UUFDRDtZQUNFLElBQUksRUFBRSxNQUFNO1lBQ1osSUFBSSxFQUFFLDhDQUE4QztZQUNwRCxhQUFhLEVBQUUsUUFBUTtZQUN2QixjQUFjLEVBQUU7Z0JBQ2QsY0FBYyxFQUFFLEtBQUs7YUFDdEI7U0FDRjtRQUNEO1lBQ0UsSUFBSSxFQUFFLFFBQVE7WUFDZCxJQUFJLEVBQUUsZ0RBQWdEO1lBQ3RELGFBQWEsRUFBRSxRQUFRO1lBQ3ZCLGNBQWMsRUFBRTtnQkFDZCxjQUFjLEVBQUUsS0FBSzthQUN0QjtTQUNGO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsUUFBUTtZQUNkLElBQUksRUFBRSxnREFBZ0Q7WUFDdEQsYUFBYSxFQUFFLFFBQVE7WUFDdkIsY0FBYyxFQUFFO2dCQUNkLGNBQWMsRUFBRSxLQUFLO2FBQ3RCO1NBQ0Y7S0FDRixDQUFDO0lBRUYsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFlLEVBQUU7UUFDbkMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLDZCQUE2QixDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQztRQUNuRSxDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDO1FBRXZFLE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==