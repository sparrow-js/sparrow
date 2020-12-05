import Tag from '../../../component/Tag';

export default class AuditTag extends Tag{
  name: string = 'AuditTag';
  vueParse: any;
  widgetType: string = 'custom';
  
  constructor (params: any) {
    super(params)
    this.config.model.custom.label = '审核中';
    this.config.model.attr.type = 'warning';
    this.setAttrsToStr();
  }
}