export class Component{
  constructor (storage: any);

  name: string;
  storage: any;
  uuid: string;
  _attrStr: string;

  setAttrsToStr():void;
  renderFragment(): void;
}

export class Box{
  name: string;
  storage: any;
  uuid: string;
  _attrStr: string;

  constructor (storage: any, globalConfig: any);
  
  setAttrsToStr():void;
  addComponent(): any;
}

export class VueParse{
  constructor (uuid: string, vueStr: string);
}