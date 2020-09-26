import VueParse from '../generator/VueParse';
const uuid = require('@lukeed/uuid');

export default class ApiComp {
  uuid: string = '';
  vueParse: any;
  name: string = 'api';

  constructor (data) {
    this.uuid = uuid().split('-')[0];

    const apiMethodList = [];
    const apiMethodNameList = [];
    console.log('***11111****', data)

    data.forEach(item => {
      apiMethodNameList.push(item.methodName)
      if (item.methodType === 'get') {
        apiMethodList.push(
          `
            async ${item.methodName}() {
              const res = await ${item.methodName}(this.listQuery);
            }
          `
        )
      } else {
        apiMethodList.push(
          `
            async ${item.methodName}() {
              const res = await ${item.methodName}(this.form);
            }
          `
        )
      }
 
    });

    const apiMethod = `
      <script>
        import {${apiMethodNameList.join(',')}} from './api';
        export default{
          methods: {
            ${apiMethodList.join(',')}
          }
        }
      </script>  
    `;

    this.vueParse = new VueParse(this.uuid, apiMethod);

  }
}