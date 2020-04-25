import * as cheerio from 'cheerio';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';

export default class VueParse{
  template: string = '';
  data: any = [];
  methods: any = [];
  uuid: string = '';
  vueStr: string = '';
  vueScript: string = '';
  $: any;
  scriptAst: any;

  constructor (uuid: string, vueStr: string) {
    this.uuid = uuid;
    this.vueStr = vueStr.replace(/_unique/g, this.uuid);
    this.init();
  }

  private init () {
    const template = this.vueStr.match(/<template>([\s\S])*<\/template>/g)[0];

    this.$ = cheerio.load(template, {
      xmlMode: true,
      decodeEntities: false
    });

    this.template = this.$('.root').html();


    this.vueScript = this.vueStr.match(/(?<=<script>)[\s\S]*(?=<\/script>)/g)[0];
    this.scriptAst = parser.parse(this.vueScript, {
      sourceType: 'module',
      plugins: [
        "jsx",
      ]
    });
    this.data = this.getData() || [];
    this.methods = this.getMethods() || [];
  }


  public getData () {
    let data = [];
    traverse(this.scriptAst, {
      ObjectMethod: (path) => {
        const { node } = path;
        if (node.key && node.key.name === 'data') {
          path.traverse({
            ReturnStatement: (pathData) => {
              data = pathData.node.argument.properties
            } 
          })
        }
      }
    });
    return data;
  }

  public setData (data: string) {
    const dataAst = parser.parse(data, {
      sourceType: 'module',
      plugins: [
        "jsx",
      ]
    });

    traverse(dataAst, {
      ObjectExpression: (path) => {
        if (path.parent.type === 'VariableDeclarator') {
          const {node} = path;
          this.data = node.properties;
        }
      }
    });

  }
  
  public getFormatData () {
    const dataAst = parser.parse(`var data = {
      id: []
    }`, {
      sourceType: 'module',
      plugins: [
        "jsx",
      ]
    });
    traverse(dataAst, {
      ObjectExpression: (path) => {
        if (path.parent.type === 'VariableDeclarator') {
          const {node} = path;
          node.properties = this.data;
        }
      }
    })

    return generate(dataAst).code;

    // ObjectExpression

    // generate().code
  }

  public getMethods () {
    let methods = [];
    traverse(this.scriptAst, {
      ObjectProperty: (path) => {
        const {node} = path;
        if (node.key.name === 'methods') {
          methods = node.value.properties;
        }
      }
    });
    return methods;
  }
}