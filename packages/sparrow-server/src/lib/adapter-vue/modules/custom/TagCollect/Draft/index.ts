import Tag from '../../../component/Tag';

export default class DraftTag extends Tag{
  name: string = 'DraftTag';
  vueParse: any;
  widgetType: string = 'custom';

  constructor (params: any) {
    super(params)
    this.config.model.custom.label = '草稿';
    this.config.model.attr.type = 'warning';
    this.setAttrsToStr();
  }
}