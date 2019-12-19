"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    const dev = [
        {
            label: '服务端口号',
            name: 'port',
            description: '',
            link: '',
            componentName: 'Input',
            componentProps: {
                placeholder: '4444',
            },
        },
        {
            label: '服务主机名',
            name: 'host',
            description: '',
            link: '',
            componentName: 'Input',
            componentProps: {
                placeholder: '127.0.0.1',
            },
        },
        {
            label: '开启 https',
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
            label: '构建路径',
            name: 'outputDir',
            link: '',
            componentName: 'Input',
            componentProps: {
                placeholder: 'dist',
            },
        },
        {
            label: '基础路径',
            name: 'publicPath',
            link: '',
            componentName: 'Input',
            componentProps: {
                placeholder: '/',
            },
        },
        {
            label: '启用 hash',
            name: 'filenameHashing',
            link: '',
            componentName: 'Switch',
            componentProps: {
                defaultChecked: true,
            },
        },
    ];
    const lint = [];
    return { dev, build, lint };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VGFza0NvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvYWRhcHRlci12dWUtdjEvbW9kdWxlcy90YXNrL2dldFRhc2tDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQkFBZSxHQUFHLEVBQUU7SUFDbEIsTUFBTSxHQUFHLEdBQUc7UUFDVjtZQUNFLEtBQUssRUFBRSxPQUFPO1lBQ2QsSUFBSSxFQUFFLE1BQU07WUFDWixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxFQUFFO1lBQ1IsYUFBYSxFQUFFLE9BQU87WUFDdEIsY0FBYyxFQUFFO2dCQUNkLFdBQVcsRUFBRSxNQUFNO2FBQ3BCO1NBQ0Y7UUFDRDtZQUNFLEtBQUssRUFBRSxPQUFPO1lBQ2QsSUFBSSxFQUFFLE1BQU07WUFDWixXQUFXLEVBQUUsRUFBRTtZQUNmLElBQUksRUFBRSxFQUFFO1lBQ1IsYUFBYSxFQUFFLE9BQU87WUFDdEIsY0FBYyxFQUFFO2dCQUNkLFdBQVcsRUFBRSxXQUFXO2FBQ3pCO1NBQ0Y7UUFDRDtZQUNFLEtBQUssRUFBRSxVQUFVO1lBQ2pCLElBQUksRUFBRSxPQUFPO1lBQ2IsV0FBVyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsRUFBRTtZQUNSLGFBQWEsRUFBRSxRQUFRO1lBQ3ZCLGNBQWMsRUFBRTtnQkFDZCxjQUFjLEVBQUUsS0FBSzthQUN0QjtTQUNGO0tBQ0YsQ0FBQztJQUVGLE1BQU0sS0FBSyxHQUFHO1FBQ1o7WUFDRSxLQUFLLEVBQUUsTUFBTTtZQUNiLElBQUksRUFBRSxXQUFXO1lBQ2pCLElBQUksRUFBRSxFQUFFO1lBQ1IsYUFBYSxFQUFFLE9BQU87WUFDdEIsY0FBYyxFQUFFO2dCQUNkLFdBQVcsRUFBRSxNQUFNO2FBQ3BCO1NBQ0Y7UUFDRDtZQUNFLEtBQUssRUFBRSxNQUFNO1lBQ2IsSUFBSSxFQUFFLFlBQVk7WUFDbEIsSUFBSSxFQUFFLEVBQUU7WUFDUixhQUFhLEVBQUUsT0FBTztZQUN0QixjQUFjLEVBQUU7Z0JBQ2QsV0FBVyxFQUFFLEdBQUc7YUFDakI7U0FDRjtRQUNEO1lBQ0UsS0FBSyxFQUFFLFNBQVM7WUFDaEIsSUFBSSxFQUFFLGlCQUFpQjtZQUN2QixJQUFJLEVBQUUsRUFBRTtZQUNSLGFBQWEsRUFBRSxRQUFRO1lBQ3ZCLGNBQWMsRUFBRTtnQkFDZCxjQUFjLEVBQUUsSUFBSTthQUNyQjtTQUNGO0tBQ0YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUVoQixPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztBQUM5QixDQUFDLENBQUMifQ==