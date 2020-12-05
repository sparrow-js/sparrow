import Tag from '../../../component/Tag';

export default class OfflineTag extends Tag{
  name: string = 'OfflineTag';
  vueParse: any;
  widgetType: string = 'custom';

  constructor (params: any) {
    super(params)
    this.config.model.custom.label = '已下线';
    this.config.model.attr.type = 'danger';
    this.setAttrsToStr();
  }
}