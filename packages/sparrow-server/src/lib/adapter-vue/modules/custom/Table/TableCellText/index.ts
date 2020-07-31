import Common from '../../Common';

export default class TableCellText extends Common{
  name: string = 'TableCellText';
  params: any;
  vueParse: any;
  uuid: string;
  constructor (data?: any) {
    super();
    this.params = data.type ? data : data.params;
  }

  public fragment () {
    let tag = '';
    const {params, type} = this.params
    const {tagType} = this.params.params;
    const typeInfo = tagType ? `:type="'${tagType}'"` : ''
    if (type === 'tag') {
      return `
        <el-tag
          ${typeInfo}
          size="small"
        >
          ${params.value}
        </el-tag>
      `;
    } else if (type === 'link'){
      return `
        <el-link
          ${typeInfo}
        >
          ${params.value}
        </el-link>
      `;
    } else if (type === 'button') {
      return `
        <el-button 
          ${typeInfo}
          size="mini"
        >
          ${params.value}
        </el-button>
      `;
    }

    return '';
  }
}