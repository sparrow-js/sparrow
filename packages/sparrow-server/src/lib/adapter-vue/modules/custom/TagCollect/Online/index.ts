import Tag from '../../../component/Tag';

export default class PublishedTag extends Tag{
  name: string = 'PublishedTag';
  vueParse: any;
  constructor (params: any) {
    super(params)
    this.config.model.custom.label = '已发布';
    this.config.model.attr.type = 'success';
    this.setAttrsToStr();
  }
}