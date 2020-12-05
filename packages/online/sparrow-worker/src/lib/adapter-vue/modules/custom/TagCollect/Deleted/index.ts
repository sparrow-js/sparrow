import Tag from '../../../component/Tag';

export default class DeletedTag extends Tag{
  name: string = 'DeletedTag';
  vueParse: any;
  widgetType: string = 'custom';

  constructor (params: any) {
    super(params)
    this.config.model.custom.label = '已删除';
    this.config.model.attr.type = 'danger';
    this.setAttrsToStr();
  }
}