import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators';
import store from '@/store';

export interface ISettingState {
  config: any;
}

@Module({ dynamic: true, store, name: 'setting' })
class Setting extends VuexModule implements ISettingState {

  public config = {};

  @Mutation
  private SET_CONFIG (config: any) {
    this.config = config;
  }



  @Action
  public setConfig(data: any) {
    this.SET_CONFIG(data)
  }
}

export const SettingModule = getModule(Setting);
