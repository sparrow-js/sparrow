import IBaseBox from '../IBaseBox';

export default class Form implements IBaseBox{
  $fragment: any;
  template: string;

  constructor (params: any) {
    this.$fragment = cheerio.load('', {
      xmlMode: true,
      decodeEntities: false
    });
  }

  public getBoxFragment(index: number): any {
    return this.$fragment;
  }

  public render () {
    
  }

  setTemplate () {

  }
}