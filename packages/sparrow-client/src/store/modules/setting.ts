import {VuexModule, Module, Mutation, Action, getModule} from 'vuex-module-decorators'
import store from '@/store';


export interface ISettingState {
  showSetting: boolean,
  settingData: any,
  settingComponent: string,
}

@Module({ dynamic: true, store, name: 'setting' })
class Setting extends VuexModule implements ISettingState {
  public showSetting = false;
  public settingData = {};
  public settingComponent = '';

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

  @Action
  public setShowSettingHandler(show: boolean) {
    this.SET_SHOW_SETTING(show);
  }

  @Action 
  public setSettingData(data: any) {
    this.SET_SETTING_DATA(data);
  }

  @Action
  public setSettingComponent(compName: string) {
    this.SET_STTING_COMPONENT('');
    setTimeout(() => {
      this.SET_STTING_COMPONENT(compName);
      this.SET_SHOW_SETTING(true);
    }, 100);
  }
}

export const SettingModule = getModule(Setting);