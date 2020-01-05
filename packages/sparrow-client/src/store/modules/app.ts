import {VuexModule, Module, Mutation, Action, getModule} from 'vuex-module-decorators'
import store from '@/store'

export interface IAppState {
  showDashboard: boolean,
  insertData: any,
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
  public showDashboard = false;
  public insertData = {};

  @Mutation
  private SHOW_DASHBOARD (showDashboard: boolean) {
    this.showDashboard = showDashboard;
  }

  @Mutation
  private INSERT_DATA (insertData: any) {
    this.insertData = insertData;
  }

  @Action
  public SetShowDashboard(showDashboard: boolean) {
    this.SHOW_DASHBOARD(showDashboard);
  }

  @Action
  public InsertData (insertData: any) {
    this.INSERT_DATA(insertData);
  }
}
export const AppModule = getModule(App)