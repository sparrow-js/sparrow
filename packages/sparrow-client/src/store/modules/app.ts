import {VuexModule, Module, Mutation, Action, getModule} from 'vuex-module-decorators'
import store from '@/store'

export interface IAppState {
  showDashboard: boolean,
  showComponentBox: boolean,
  boxIndex: number,
  insertData: {
    boxIndex: number,
    data: any,
  },
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
  public showDashboard = false;
  public boxIndex = -1;
  public insertData = {
    boxIndex: -1,
    data: {}
  };
  public dashboardTabIndex = 0;
  public showComponentBox = false

  @Mutation
  private SHOW_DASHBOARD (showDashboard: boolean) {
    this.showDashboard = showDashboard;
  }

  @Mutation
  private INSERT_DATA (insertData: any) {
    this.insertData = insertData;
  }

  @Mutation
  private SET_BOX_INDEX (index: number) {
    this.boxIndex = index;
  }

  @Mutation
  private SHOW_COMPONENT (showComponentBox: boolean) {
    this.showComponentBox = showComponentBox;
  }


  @Action
  public SetShowDashboard(showDashboard: boolean) {
    this.SHOW_DASHBOARD(showDashboard);
  }

  @Action
  public InsertData (insertData: any) {
    this.INSERT_DATA(insertData);
  }

  @Action
  public SetDoxIndex (index: number) {
    this.SET_BOX_INDEX(index);
  }

  @Action
  public SetShowComponent (showComponentBox: boolean) {
    this.SHOW_COMPONENT(showComponentBox)
  }

}
export const AppModule = getModule(App)