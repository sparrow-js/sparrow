import VueParse from '../generator/VueParse';
const uuid = require('@lukeed/uuid');

export default class ApiComp {
  uuid: string = '';
  vueParse: any;
  name: string = 'api';
  path: string = '/api/api';

  constructor (data) {
    this.uuid = uuid().split('-')[0];

    const apiMethodList = [];
    const apiMethodNameList = [];

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
        import {${apiMethodNameList.join(',')}} from '@/views/api';
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