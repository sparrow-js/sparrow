import Common from '../../Common';
import * as _ from 'lodash';

export default class CardPanel extends Common{
  name: string = 'SvgIcon';
  params: any;
  uuid: string;
  type: string;
  config: any;
  components: any = [];
  path: string = '/EditBlock/PanelGroup/SvgIcon';

  constructor (params: any = {}) {
    super();
    const {config} = params;
    if (config) {
      this.config = config;
    } else {
      this.config = _.cloneDeep(require('./config').default);
    }
    this.setAttrsToStr();
  }

  public fragment () {
    console.log('****51234*****', this._attrStr);
    return `
      <svg-icon ${this._attrStr} class-name="card-panel-icon" />
    `;
  }
}