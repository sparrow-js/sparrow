"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    return [
        {
            label: '构建路径',
            name: 'outputDir',
            description: '修改构建后的文件目录',
            link: '',
            componentName: 'Input',
            componentProps: {
                placeholder: 'dist',
            },
        },
        {
            label: '基础路径',
            name: 'publicPath',
            description: '为项目中的所有资源指定一个基础路径',
            link: '',
            componentName: 'Input',
            componentProps: {
                placeholder: '/',
            },
        },
        {
            label: '启用 hash',
            name: 'filenameHashing',
            description: '如果希望构建后的资源带 hash 版本，可以开启该选项',
            link: '',
            componentName: 'Switch',
            componentProps: {
                defaultChecked: true,
            },
        },
    ];
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Q29uZmlnU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9hZGFwdGVyLXZ1ZS12MS9tb2R1bGVzL2NvbmZpZ3VyYXRpb24vZ2V0Q29uZmlnU2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWUsR0FBRyxFQUFFO0lBQ2xCLE9BQU87UUFDTDtZQUNFLEtBQUssRUFBRSxNQUFNO1lBQ2IsSUFBSSxFQUFFLFdBQVc7WUFDakIsV0FBVyxFQUFFLFlBQVk7WUFDekIsSUFBSSxFQUFFLEVBQUU7WUFDUixhQUFhLEVBQUUsT0FBTztZQUN0QixjQUFjLEVBQUU7Z0JBQ2QsV0FBVyxFQUFFLE1BQU07YUFDcEI7U0FDRjtRQUNEO1lBQ0UsS0FBSyxFQUFFLE1BQU07WUFDYixJQUFJLEVBQUUsWUFBWTtZQUNsQixXQUFXLEVBQUUsbUJBQW1CO1lBQ2hDLElBQUksRUFBRSxFQUFFO1lBQ1IsYUFBYSxFQUFFLE9BQU87WUFDdEIsY0FBYyxFQUFFO2dCQUNkLFdBQVcsRUFBRSxHQUFHO2FBQ2pCO1NBQ0Y7UUFDRDtZQUNFLEtBQUssRUFBRSxTQUFTO1lBQ2hCLElBQUksRUFBRSxpQkFBaUI7WUFDdkIsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxJQUFJLEVBQUUsRUFBRTtZQUNSLGFBQWEsRUFBRSxRQUFRO1lBQ3ZCLGNBQWMsRUFBRTtnQkFDZCxjQUFjLEVBQUUsSUFBSTthQUNyQjtTQUNGO0tBQ0YsQ0FBQztBQUNKLENBQUMsQ0FBQyJ9