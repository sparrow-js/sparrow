import Divider from '../../../component/Divider';

export default class VDivider extends Divider{
  name: string = 'HDivider';
  vueParse: any;
  constructor (params: any) {
    super(params)
    this.config.model.attr.direction = 'vertical';
    this.setAttrsToStr();
  }
}