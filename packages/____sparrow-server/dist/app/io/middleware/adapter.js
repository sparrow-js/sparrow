"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = app => {
    const logger = app.getLogger();
    return async (ctx, next) => {
        const { packet } = ctx;
        const [eventName, args, callback] = packet;
        const [namespace, moduleName, methodName] = eventName.split('.');
        if (namespace === 'adapter') {
            try {
                const { projectManager, i18n } = app;
                const project = await projectManager.getCurrent();
                // Note: Can’t use destructuring assignment
                ctx.i18n = i18n;
                callback(null, await project.adapter[moduleName][methodName](args, ctx));
            }
            catch (error) {
                logger.error(`adapter[${moduleName}][${methodName}] got error:`, error);
                callback({
                    code: error.code,
                    message: error.message,
                });
            }
        }
        await next();
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHAvaW8vbWlkZGxld2FyZS9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWUsR0FBRyxDQUFDLEVBQUU7SUFDbkIsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBRS9CLE9BQU8sS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUN6QixNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3ZCLE1BQU0sQ0FBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBRSxHQUFHLE1BQU0sQ0FBQztRQUM3QyxNQUFNLENBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUUsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRW5FLElBQUksU0FBUyxLQUFLLFNBQVMsRUFBRTtZQUMzQixJQUFJO2dCQUNGLE1BQU0sRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDO2dCQUNyQyxNQUFNLE9BQU8sR0FBRyxNQUFNLGNBQWMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDbEQsMkNBQTJDO2dCQUMzQyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDaEIsUUFBUSxDQUFDLElBQUksRUFBRSxNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDMUU7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsVUFBVSxLQUFLLFVBQVUsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN4RSxRQUFRLENBQUM7b0JBQ1AsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO29CQUNoQixPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87aUJBQ3ZCLENBQUMsQ0FBQzthQUNKO1NBQ0Y7UUFFRCxNQUFNLElBQUksRUFBRSxDQUFDO0lBQ2YsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDIn0=