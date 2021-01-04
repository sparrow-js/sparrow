import Base from '../Base';
import VueParse from '../../generator/VueParse';
import * as _ from 'lodash';

export default class ListApi  extends Base {  
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

  }

  public setPreview (type: number) {    
    this.renderApi();
  }

  private renderApi () {
    const custom = _.get(this.config, 'model.custom');
    console.log('*********8*******', custom);
    
    let apiMethodStr = '';
    if (custom) {
      apiMethodStr = `
        async ${custom.methodName}() {
          const res = await ${custom.methodName}(this.listQuery);
          const {data} = res;
          if (data) {
            this.list = data.list
          }
        }
      `;

      const apiMethod = `
        <script>
          export default{
            data () {
              return {
                list: null,
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