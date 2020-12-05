import Tag from '../../../component/Tag';

export default class PublishedTag extends Tag{
  name: string = 'PublishedTag';
  vueParse: any;
  widgetType: string = 'custom';

  constructor (params: any) {
    super(params)
    this.config.model.custom.label = '已上线';
    this.config.model.attr.type = 'success';
    this.setAttrsToStr();
  }
}