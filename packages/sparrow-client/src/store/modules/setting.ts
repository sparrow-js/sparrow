import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators';
import store from '@/store';

export interface ISettingState {
  showSetting: boolean;
  settingData: any;
  settingComponent: string;
  showCodeDraw: boolean;
}

@Module({ dynamic: true, store, name: 'setting' })
class Setting extends VuexModule implements ISettingState {
  public showSetting = false;
  public settingData = {};
  public settingComponent = '';
  public showCodeDraw = false;

  @Mutation
  private SET_SHOW_SETTING(show: boolean) {
    this.showSetting = show;
  }

  @Mutation
  private SET_SETTING_DATA(data: any) {
    this.settingData = data;
  }

  @Mutation
  private SET_STTING_COMPONENT(compName: string) {
    this.settingComponent = compName;
  }

  @Mutation
  private SET_SHOW_CODE_DRAW(showCodeDraw: boolean) {
    this.showCodeDraw = showCodeDraw;
  }

  @Action
  public setShowSettingHandler(show: boolean) {
    this.SET_SHOW_SETTING(show);
  }

  @Action
  public setSettingData(data: any) {
    this.SET_SETTING_DATA(data);
  }

  @Action
  public setSettingComponent(payload: {
    compName: string;
    forceRefresh: boolean;
  }) {
    // 重置
    console.log(payload.forceRefresh);
    if (payload.forceRefresh) {
      this.SET_STTING_COMPONENT('');
    }

    setTimeout(() => {
      this.SET_STTING_COMPONENT(payload.compName);
      this.SET_SHOW_SETTING(true);
    }, 100);
  }

  @Action
  private setShowCodeBraw (showCodeDraw: boolean) {
    this.SET_SHOW_CODE_DRAW(showCodeDraw);
  }
}

export const SettingModule = getModule(Setting);
