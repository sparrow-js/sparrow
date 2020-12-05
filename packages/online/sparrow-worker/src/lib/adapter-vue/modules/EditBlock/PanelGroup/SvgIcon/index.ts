import Common from '../../Common';
import * as _ from 'lodash';

export default class SvgIcon extends Common{
  name: string = 'SvgIcon';
  params: any;
  uuid: string;
  type: string;
  config: any;
  components: any = [];
  path: string = '/EditBlock/PanelGroup/SvgIcon';

  constructor (params: any = {}) {
    super();
    if (params.initType === 'auto') {
      this.config = params;
    } else {
      this.config = _.cloneDeep(require('./config'));
    }
    this.setAttrsToStr();
  }

  public fragment () {
    return `
      <div class="card-panel-icon-wrapper ${this.config.model.custom['icon-color']}">
        <svg-icon ${this._attrStr} class-name="card-panel-icon" />
      </div>  
    `;
  }
}