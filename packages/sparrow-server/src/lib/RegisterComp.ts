import Lowdb from './lowdb';
const uuid = require('@lukeed/uuid');

class RegisterComponent {
  private version = '0.0.2';
  constructor () {}

  public init () {
    const version = Lowdb.get('components.version').value();
    if (!version || version !== this.version) {
      Lowdb.set('components.version', this.version).write();
      /**
       *  {
            id: uuid(),
            key: '', // 组件名
            path: '', // 位置
            des: '', // 描述
            keywords: '', // 搜索关键词
            children: [], // 种类
            ascription: [ // 归属于哪种容器
              'form'
            ]
          }
       */
      Lowdb.set('components.list', [
        {
          id: uuid(),
          key: 'SaveButton',
          label: '保存',
          path: '../../component/BaseForm/SaveButton',
          des: '表单保存按钮',
          keywords: '表单保存, 按钮, 表单',
          ascription: [
            'BaseForm'
          ]
        },
        {
          id: uuid(),
          key: 'ResetButton',
          label: '重置',
          path: '../../component/BaseForm/ResetButton',
          des: '表单保存按钮',
          keywords: '表单保存, 按钮, 表单',
          ascription: [
            'BaseForm'
          ]
        }
      ]).write();
    }
  }

  getCompByAscriptionData (box: string) {
    const list = Lowdb.get('components.list').filter(item => {
      return item.ascription.includes(box);
    }).value();
  }
}
const instance = new RegisterComponent();
export default instance;