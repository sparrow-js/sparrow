"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app) => {
    const { Controller } = app;
    return class ProjectController extends Controller {
        async list() {
            const { projectManager } = app;
            const projects = await projectManager.getProjects();
            return projects.map((project) => project.toJSON());
        }
        async create(ctx) {
            const { projectManager } = app;
            const { args } = ctx;
            await projectManager.createProject(args);
        }
        async delete(ctx) {
            const { projectManager } = app;
            const { args } = ctx;
            await projectManager.deleteProject(args);
        }
        async add(ctx) {
            const { projectManager } = app;
            const { args } = ctx;
            const { projectPath } = args;
            await projectManager.addProject(projectPath);
        }
        async getCurrent() {
            const { projectManager } = app;
            const project = await projectManager.getCurrent();
            return project.toJSON();
        }
        async setCurrent(ctx) {
            const { projectManager } = app;
            const { args } = ctx;
            const { path } = args;
            const project = await projectManager.setCurrent(path);
            return project.toJSON();
        }
        async setPanel(ctx) {
            const { args } = ctx;
            const { projectManager } = app;
            const project = await projectManager.getCurrent();
            return project.setPanel(args);
        }
        async sortPanels(ctx) {
            const { args } = ctx;
            const { projectManager } = app;
            const project = await projectManager.getCurrent();
            return project.sortPanels(args);
        }
        async reloadAdapter() {
            const { projectManager } = app;
            const project = await projectManager.getCurrent();
            const result = await project.reloadAdapter();
            return result;
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvaW8vY29udHJvbGxlci9ob21lL3Byb2plY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQkFBZSxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ3JCLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFFM0IsT0FBTyxNQUFNLGlCQUFrQixTQUFRLFVBQVU7UUFDeEMsS0FBSyxDQUFDLElBQUk7WUFDZixNQUFNLEVBQUUsY0FBYyxFQUFFLEdBQUcsR0FBRyxDQUFDO1lBQy9CLE1BQU0sUUFBUSxHQUFHLE1BQU0sY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3BELE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDckQsQ0FBQztRQUVNLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRztZQUNyQixNQUFNLEVBQUUsY0FBYyxFQUFFLEdBQUcsR0FBRyxDQUFDO1lBQy9CLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUM7WUFFckIsTUFBTSxjQUFjLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFFTSxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUc7WUFDckIsTUFBTSxFQUFFLGNBQWMsRUFBRSxHQUFHLEdBQUcsQ0FBQztZQUMvQixNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDO1lBRXJCLE1BQU0sY0FBYyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBRU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHO1lBQ2xCLE1BQU0sRUFBRSxjQUFjLEVBQUUsR0FBRyxHQUFHLENBQUM7WUFDL0IsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQztZQUNyQixNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQzdCLE1BQU0sY0FBYyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBRU0sS0FBSyxDQUFDLFVBQVU7WUFDckIsTUFBTSxFQUFFLGNBQWMsRUFBRSxHQUFHLEdBQUcsQ0FBQztZQUMvQixNQUFNLE9BQU8sR0FBRyxNQUFNLGNBQWMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUVsRCxPQUFPLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMxQixDQUFDO1FBRU0sS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHO1lBQ3pCLE1BQU0sRUFBRSxjQUFjLEVBQUUsR0FBRyxHQUFHLENBQUM7WUFDL0IsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQztZQUNyQixNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBRXRCLE1BQU0sT0FBTyxHQUFHLE1BQU0sY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0RCxPQUFPLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMxQixDQUFDO1FBRU0sS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHO1lBQ3ZCLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUM7WUFDckIsTUFBTSxFQUFFLGNBQWMsRUFBRSxHQUFHLEdBQUcsQ0FBQztZQUMvQixNQUFNLE9BQU8sR0FBRyxNQUFNLGNBQWMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsRCxPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUVNLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRztZQUN6QixNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDO1lBQ3JCLE1BQU0sRUFBRSxjQUFjLEVBQUUsR0FBRyxHQUFHLENBQUM7WUFDL0IsTUFBTSxPQUFPLEdBQUcsTUFBTSxjQUFjLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEQsT0FBTyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFFTSxLQUFLLENBQUMsYUFBYTtZQUN4QixNQUFNLEVBQUUsY0FBYyxFQUFFLEdBQUcsR0FBRyxDQUFDO1lBQy9CLE1BQU0sT0FBTyxHQUFHLE1BQU0sY0FBYyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2xELE1BQU0sTUFBTSxHQUFHLE1BQU0sT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQzdDLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUM7S0FDRixDQUFDO0FBQ0osQ0FBQyxDQUFDIn0=