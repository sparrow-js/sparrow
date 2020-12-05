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
  boxUuid: string;
  activeCompId: string;
  insertData: {
    data: any;
  };
  insertPosition: any;
  componentIs: string;
  uuid: string;
  activeTreeIndex: number,
  selecedFileInfo: any,
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
  public showDashboard = false;
  public insertData = {
    data: {}
  };
  public dashboardTabIndex = 0;
  public showComponentBox = false;
  public componentIs = '';
  public insertPosition = {};
  public uuid = '';
  public boxUuid = '';
  public activeTreeIndex = 2;
  public activeCompId = '';

  public selecedFileInfo = null;

  @Mutation
  private SHOW_DASHBOARD(showDashboard: boolean) {
    this.showDashboard = showDashboard;
  }

  @Mutation
  private INSERT_DATA(insertData: any) {
    this.insertData = insertData;
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

  @Mutation
  private SET_ACTIVE_TREE_INDEX (activeIndex: number) {
    this.activeTreeIndex = activeIndex;
  }
  @Mutation
  private SET_ACTIVE_COMP_ID (compId: string) {
    this.activeCompId = compId;
  }

  @Mutation
  private SET_SELECTED_FILE_INFO(item: any) {
    this.selecedFileInfo = item;
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

  @Action
  public setActiveTreeIndex (activeIndex: number) {
    this.SET_ACTIVE_TREE_INDEX(activeIndex);
  }

  @Action
  public setActiveCompId (compId: string) {
    this.SET_ACTIVE_COMP_ID(compId);
  }

  @Action
  public setSelecedFileInfo(item: any) {
    this.SET_SELECTED_FILE_INFO(item);
  }
}
export const AppModule = getModule(App);
