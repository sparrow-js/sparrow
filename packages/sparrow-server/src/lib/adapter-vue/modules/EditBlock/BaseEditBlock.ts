import Base from '../box/Base';


export default class BaseEditBlock extends Base{
  widgetType: string = 'EditBlock';
  isBox: boolean = true;
  
  constructor (storage) {
    super(storage);
  }
}