import {VuexModule, Module, Mutation, Action, getModule} from 'vuex-module-decorators'
import store from '@/store'

export interface IAppState {
  showDashboard: boolean
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
  public showDashboard = false;

  @Mutation
  private SHOW_DASHBOARD (showDashboard: boolean) {
    this.showDashboard = showDashboard;
  }

  @Action
  public SetShowDashboard(showDashboard: boolean) {
    this.SHOW_DASHBOARD(showDashboard);
  }
}
export const AppModule = getModule(App)