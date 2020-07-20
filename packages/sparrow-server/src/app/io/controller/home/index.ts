import RegisterComp from '../../../../lib/RegisterComp';

export default (app) => {
  const { Controller } = app;

  return class IndexController extends Controller {
    public async init() {
      RegisterComp.init();
    }
  };
};
