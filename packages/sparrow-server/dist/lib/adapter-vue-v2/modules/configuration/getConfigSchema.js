"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (ctx) => {
    const { i18n } = ctx;
    const result = [
        {
            name: 'outputDir',
            description: '',
            link: '',
            componentName: 'Input',
            componentProps: {
                placeholder: 'dist',
            },
        },
        {
            name: 'publicPath',
            description: '',
            link: '',
            componentName: 'Input',
            componentProps: {
                placeholder: '/',
            },
        },
        {
            name: 'filenameHashing',
            description: '',
            link: '',
            componentName: 'Switch',
            componentProps: {
                defaultChecked: true,
            },
        },
    ];
    return result.map((v) => {
        v.label = i18n.format(`vueAdapter.configuration.${v.name}.label`);
        v.description = i18n.format(`vueAdapter.configuration.${v.name}.des`);
        return v;
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Q29uZmlnU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9hZGFwdGVyLXZ1ZS12Mi9tb2R1bGVzL2NvbmZpZ3VyYXRpb24vZ2V0Q29uZmlnU2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0JBQWUsQ0FBQyxHQUFhLEVBQWlCLEVBQUU7SUFDOUMsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQztJQUVyQixNQUFNLE1BQU0sR0FBVTtRQUNwQjtZQUNFLElBQUksRUFBRSxXQUFXO1lBQ2pCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLEVBQUU7WUFDUixhQUFhLEVBQUUsT0FBTztZQUN0QixjQUFjLEVBQUU7Z0JBQ2QsV0FBVyxFQUFFLE1BQU07YUFDcEI7U0FDRjtRQUNEO1lBQ0UsSUFBSSxFQUFFLFlBQVk7WUFDbEIsV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsRUFBRTtZQUNSLGFBQWEsRUFBRSxPQUFPO1lBQ3RCLGNBQWMsRUFBRTtnQkFDZCxXQUFXLEVBQUUsR0FBRzthQUNqQjtTQUNGO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsaUJBQWlCO1lBQ3ZCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLEVBQUU7WUFDUixhQUFhLEVBQUUsUUFBUTtZQUN2QixjQUFjLEVBQUU7Z0JBQ2QsY0FBYyxFQUFFLElBQUk7YUFDckI7U0FDRjtLQUNGLENBQUM7SUFFRixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQ2YsQ0FBQyxDQUFDLEVBQWUsRUFBRTtRQUNqQixDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDO1FBQ2xFLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUM7UUFFdEUsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDLENBQ0YsQ0FBQztBQUNKLENBQUMsQ0FBQyJ9