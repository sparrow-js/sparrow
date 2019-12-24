
class generator{
  constructor () {}

  public init () {
    return {
      id: '12345',
      message: 'test test test'
    }
  }

  public ready() {
    return {
      id: '678901',
      message: 'hello world'
    }
  }
  
  public addBox (id) {
    
  }

  public updateBox (config) {

  }

  public removeBox () {}

}

export default (app) => {
  app.beforeStart(async () => {
    app.generator = new generator();
  });
};