import {VuexModule, Module, Mutation, Action, getModule} from 'vuex-module-decorators'
import store from '@/store';


export interface ISettingState {
  showSetting: boolean,
  settingData: any
}

@Module({ dynamic: true, store, name: 'setting' })
class Setting extends VuexModule implements ISettingState {
  public showSetting = true;
  public settingData = {};

  @Mutation
  private SET_SHOW_SETTING(show: boolean) {
    this.showSetting = show;
  }

  @Mutation
  private SET_SETTING_DATA(data: any) {
    this.settingData = data;
  }

  @Action
  public setShowSettingHandler(show: boolean) {
    this.SET_SHOW_SETTING(show);
  }

  @Action 
  public setSettingData(data: any) {
    this.SET_SETTING_DATA(data);
  }
}

export const SettingModule = getModule(Setting);
