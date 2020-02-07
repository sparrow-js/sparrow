import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import * as t from '@babel/types';

import fragment from './fragment';


export default class VueGenerator {
  pageAST: any;
  type: string;

  constructor (type?: string) {
    this.type = type
  }

  public getScriptValue (propName: string): any {
    let props = [];
    const scriptAst = parser.parse(fragment.initScriptStr, {
      sourceType: 'module',
    });
    traverse(scriptAst, {
      ExportDefaultDeclaration ({node}) {
        props = node.declaration.properties;
      }
    });
    if (!props) return;
    const propNode = props.filter(item => {
      return item.key.name === propName;
    });
    return propNode[0];
  }

  public getAstByCode (code: string): any {
    return parser.parse(code, {
      allowImportExportEverywhere: true,
      sourceType: 'module',
    });
  }

  public importStr (componentName: string) {
    return `import ${componentName} from './components/${componentName}'`;
  }

  public initScript () {
    let scriptStr = fragment.scriptViewStr;
    if (this.type === 'block') {
      scriptStr = fragment.scriptViewStr;
    }
    const pageAST = parser.parse(scriptStr, {
      sourceType: 'module',
    });
    this.pageAST = pageAST;
    return this.pageAST;
  }

  public appendComponent (componentName: string) {
    const self = this;
    traverse(this.pageAST, {
      Program({ node }) {
        // import components
        traverse(self.getAstByCode(self.importStr(componentName)), {
          Program(path) {
            node.body.unshift(path.node.body[0]);
          }
        });
      },
      ObjectExpression (path) {
        if (path.parent.type === 'ExportDefaultDeclaration') {
          const {node} = path;
          let componentsNode = node.properties.find(item => item.key.name === 'components')
          if (!componentsNode) {
            componentsNode = self.getScriptValue('components');
            node.properties.unshift(componentsNode);
          }
          // vue components add component
          componentsNode.value.properties.push(
            t.objectProperty(t.identifier(componentName), t.identifier(componentName), false, true)
          );
          
        }
      }
    });
  }

}