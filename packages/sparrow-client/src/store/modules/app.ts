import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators';
import store from '@/store';

export interface IAppState {
  showDashboard: boolean;
  showComponentBox: boolean;
  boxIndex: number;
  boxUuid: string;
  insertData: {
    boxIndex: number;
    data: any;
  };
  insertPosition: any;
  componentIs: string;
  uuid: string;
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
  public showComponentBox = false;
  public componentIs = '';
  public insertPosition = {};
  public uuid = '';
  public boxUuid = '';

  @Mutation
  private SHOW_DASHBOARD(showDashboard: boolean) {
    this.showDashboard = showDashboard;
  }

  @Mutation
  private INSERT_DATA(insertData: any) {
    this.insertData = insertData;
  }

  @Mutation
  private SET_BOX_INDEX(index: number) {
    this.boxIndex = index;
  }

  @Mutation
  private SHOW_COMPONENT(showComponentBox: boolean) {
    this.showComponentBox = showComponentBox;
  }

  @Mutation
  private COMPONENT_IS(componentName: string) {
    this.componentIs = componentName;
  }

  @Mutation
  private INSERT_POSITION(data: any) {
    this.insertPosition = data;
  }

  @Mutation
  private SET_UUID (id: string) {
    this.uuid = id;
  }

  @Mutation
  private SET_BOXUUID(id: string) {
    this.boxUuid = id;
  }

  @Action
  public SetShowDashboard(showDashboard: boolean) {
    this.SHOW_DASHBOARD(showDashboard);
  }

  @Action
  public InsertData(insertData: any) {
    this.INSERT_DATA(insertData);
  }

  @Action
  public SetDoxIndex(index: number) {
    this.SET_BOX_INDEX(index);
  }

  @Action
  public SetShowComponent(showComponentBox: boolean) {
    this.SHOW_COMPONENT(showComponentBox);
  }

  @Action
  public SetComponentIs(componentName: string) {
    this.COMPONENT_IS(componentName);
  }

  @Action
  public InsertPosition(data: any) {
    this.INSERT_POSITION(data);
  }

  @Action
  public setUuid (id: string) {
    this.SET_UUID(id);
  }

  @Action
  public setBoxUuid (id: string) {
    this.SET_BOXUUID(id);
  }
}
export const AppModule = getModule(App);
