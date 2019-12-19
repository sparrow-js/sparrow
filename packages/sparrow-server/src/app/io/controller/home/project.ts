export default (app) => {
  const { Controller } = app;

  return class ProjectController extends Controller {
    public async list() {
      const { projectManager } = app;
      const projects = await projectManager.getProjects();
      return projects.map((project) => project.toJSON());
    }
  };
};
