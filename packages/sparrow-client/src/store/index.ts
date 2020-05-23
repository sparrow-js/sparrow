import Vue from 'vue';
import Vuex from 'vuex';
import { IAppState } from './modules/app';
import { ISettingState } from './modules/setting';

Vue.use(Vuex);

export interface IRootState {
  app: IAppState;
  setting: ISettingState;
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({});
