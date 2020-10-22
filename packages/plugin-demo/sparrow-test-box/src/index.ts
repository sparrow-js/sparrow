
import {Box} from '@sparrow-vue/sparrow-utils';
import * as _ from 'lodash';

export default class Divider extends Box{
  name: string = 'Divider';
  config: any = {};
  $fragment: any;

  constructor (params: any, storge: any) {
    super(storge);
    const {initType} = params;
    if (initType === 'auto' ) {
      this.config = params;
    } else {
      this.config = _.cloneDeep(require('./config').default);
    }
    this.setAttrsToStr();
  }

  public insertEditText (params) {
    this.config.model.custom.label = params.value;
  }


  public fragment () {

    const type = this.storage.get('preview_view_status') || 0;
    let divider = '';
    if (type === 0) {
      divider = `<div class="drag-box clearfix" ${this._attrStr}></div>`
    } else {
      divider = `
      <div class="drag-box clearfix" ${this._attrStr}></div>
      `;
    }
    return divider;
  }
}