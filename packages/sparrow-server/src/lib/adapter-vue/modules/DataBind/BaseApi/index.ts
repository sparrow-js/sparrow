import Base from '../Base';
import VueParse from '../../generator/VueParse';
import * as _ from 'lodash';

export default class BaseApi  extends Base {
  vueParse: any;

  constructor (data: any, storage: any) {
    super(storage);
    const {apiForm, config} = data;
    if (config) {
      this.config = config;
    } else {
      this.config = _.cloneDeep(require('./config').default);
      _.set(this.config, 'model.custom', apiForm);
    }

    this.renderApi();

    if (apiForm) {

    }
  }

  public setPreview (type: number) {    
    this.renderApi();
  }

  private renderApi () {
    const custom = _.get(this.config, 'model.custom');
    const dataName = custom.dataName || `data${this.uuid}`;
    let apiMethodStr = '';
    if (custom) {

      if (custom.methodType === 'get') {
        apiMethodStr = `
          async ${custom.methodName}() {
            const res = await ${custom.methodName}(this.listQuery);
            if (res && res.data) {
              this.${dataName} = res.data;
            }
          }
        `
      } else {
        apiMethodStr = `
          async ${custom.methodName}() {
            const res = await ${custom.methodName}(this.form);
            if (res && res.data) {
              this.${dataName} = res.data;
            }
          }
        `
      }

      const apiMethod = `
        <script>
          export default{
            data () {
              return {
                ${dataName}: null
              };
            },
            methods: {
              ${apiMethodStr}
            }
          }
        </script>
      `;

      this.vueParse = new VueParse(this.uuid, apiMethod);
    }
  }
  
}