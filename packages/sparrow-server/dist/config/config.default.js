"use strict";
module.exports = (appInfo) => {
    const config = {};
    // use for cookie sign key, should change to your own and keep security
    config.keys = `${appInfo.name}_1555062042825_9790`;
    // middleware config
    config.middleware = ['client'];
    config.view = {
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.html': 'nunjucks',
        },
    };
    // socket.io
    config.io = {
        namespace: {
            '/': {
                connectionMiddleware: [],
                packetMiddleware: ['adapter'],
            },
        },
    };
    config.cors = {
        origin: '*',
        allowMethods: 'GET,PUT,POST,DELETE',
    };
    config.security = {
        csrf: {
            headerName: 'x-csrf-token',
            ignore: (ctx) => ctx.ip === '127.0.0.1',
        },
    };
    return config;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2NvbmZpZy5kZWZhdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkFBUyxDQUFDLE9BQVksRUFBRSxFQUFFO0lBQ3hCLE1BQU0sTUFBTSxHQUFRLEVBQUUsQ0FBQztJQUV2Qix1RUFBdUU7SUFDdkUsTUFBTSxDQUFDLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxJQUFNLHFCQUFxQixDQUFDO0lBRXJELG9CQUFvQjtJQUNwQixNQUFNLENBQUMsVUFBVSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFL0IsTUFBTSxDQUFDLElBQUksR0FBRztRQUNaLGlCQUFpQixFQUFFLFVBQVU7UUFDN0IsT0FBTyxFQUFFO1lBQ1AsT0FBTyxFQUFFLFVBQVU7U0FDcEI7S0FDRixDQUFDO0lBRUYsWUFBWTtJQUNaLE1BQU0sQ0FBQyxFQUFFLEdBQUc7UUFDVixTQUFTLEVBQUU7WUFDVCxHQUFHLEVBQUU7Z0JBQ0gsb0JBQW9CLEVBQUUsRUFBRTtnQkFDeEIsZ0JBQWdCLEVBQUUsQ0FBQyxTQUFTLENBQUM7YUFDOUI7U0FDRjtLQUNGLENBQUM7SUFFRixNQUFNLENBQUMsSUFBSSxHQUFHO1FBQ1osTUFBTSxFQUFFLEdBQUc7UUFDWCxZQUFZLEVBQUUscUJBQXFCO0tBQ3BDLENBQUM7SUFFRixNQUFNLENBQUMsUUFBUSxHQUFHO1FBQ2hCLElBQUksRUFBRTtZQUNKLFVBQVUsRUFBRSxjQUFjO1lBQzFCLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxXQUFXO1NBQ3hDO0tBQ0YsQ0FBQztJQUVGLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMsQ0FBQyJ9