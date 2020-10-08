import Divider from '../../../component/Divider';

export default class HDivider extends Divider{
  name: string = 'HDivider';
  vueParse: any;
  constructor (params: any) {
    super(params)
    this.config.model.attr.direction = 'horizontal';
    this.setAttrsToStr();
  }
}