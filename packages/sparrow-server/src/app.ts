import {run} from './util/runView';
// run();

export default class AppBootHook {
  public app: any;

  constructor(app) {
    this.app = app;
  }

  public async didLoad() {
    run();
    // send server log to remote in production
    if (this.app.config.env === 'prod') {}
  }
}
