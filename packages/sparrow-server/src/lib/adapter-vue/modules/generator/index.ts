import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import * as t from '@babel/types';
import * as _ from 'lodash';

import fragment from './fragment';


export default class VueGenerator {
  pageAST: any;
  type: string;

  importComps: any = [];
  imports: any = [];

  constructor (type?: string) {
    this.type = type;
    this.initScript();
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

  public importStr (componentName: string, importComp: boolean) {
    let importText = `import ${componentName} from './components/${componentName}'`;
    if (importComp === true) {
      importText = `import ${componentName} from '../components/${componentName}'`
    } 
    return importText;
  }

  public initScript () {
    this.importComps = [];
    this.imports = [];
    let scriptStr = fragment.scriptViewStr;
    if (this.type === 'block') {
      scriptStr = fragment.scriptBlockStr;
    }
    const pageAST = parser.parse(scriptStr, {
      sourceType: 'module',
    });
    this.pageAST = pageAST;
    return this.pageAST;
  }

  public appendImport (listImport) {
    const body = _.get(this.pageAST, 'program.body') || [];
    listImport.forEach(item => {
      if(this.imports.includes(item.path)) {
        return;
      }
      this.imports.push(item.path);
      body.unshift(item.node);
    })
  }


  public appendComponent (componentName: string, importComp: boolean = false) {
    if (this.importComps.includes(componentName)) {
      return;
    }
    this.importComps.push(componentName);

    traverse(this.pageAST, {
      Program: ({ node }) => {
        // import components
        traverse(this.getAstByCode(this.importStr(componentName, importComp)), {
          Program: (path) => {
            node.body.unshift(path.node.body[0]);
          }
        });
      },
      ObjectExpression: (path) => {
        if (path.parent.type === 'ExportDefaultDeclaration') {
          const {node} = path;
          let componentsNode = node.properties.find(item => item.key.name === 'components')
          if (!componentsNode) {
            componentsNode = this.getScriptValue('components');
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

  public getDataStrAst (code: string) {
    let dataCodeNode: any;
    if (code) {
      const codeAst = this.getAstByCode(code);
      traverse(codeAst, {
        ObjectExpression: (path) => {
          if (path.parent.type === 'VariableDeclarator') {
            dataCodeNode = path.node.properties;
          }
        }
      })
    }
    return dataCodeNode;
  };

  private initVueProps (propName: string) {
    traverse(this.pageAST, {
      ObjectExpression: (path) => {
        if (path.parent.type === 'ExportDefaultDeclaration') {
          const {node} = path;
          let dataNode = node.properties.find(item => item.key.name === propName);
          if (!dataNode) {
            dataNode = this.getScriptValue(propName);
            node.properties.unshift(dataNode);
          }
        }
      },
    })
  }

  public appendData (codeProps?: any) {
    this.initVueProps('data');

    traverse(this.pageAST, {
      ObjectMethod: (path) => {
        const { node } = path;
        if (node.key && node.key.name === 'data') {
          path.traverse({
            ReturnStatement: (pathData) => {
              if (codeProps) {
                const currentProperties = pathData.node.argument.properties;
                codeProps.forEach((curData) => {
                  const findIndex = currentProperties.findIndex(item => item.key.name ===curData.key.name);
                  if (findIndex === -1) {
                    currentProperties.push(curData);
                  } else {
                    currentProperties[findIndex] = curData;
                  }
                })
                pathData.node.argument.properties = currentProperties;
              }
            } 
          })
        }
      }
    });

  }

  public appendMethods (methodsProps: any) {
    this.initVueProps('methods');
    traverse(this.pageAST, {
      ObjectProperty: (path) => {
        const { node } = path;
        if (node.key && node.key.name === 'methods') {

          const currentProperties = node.value.properties;
          methodsProps.forEach((curData) => {
            const findIndex = currentProperties.findIndex(item => item.key.name ===curData.key.name);
            if (findIndex === -1) {
              currentProperties.push(curData);
            } else {
              currentProperties[findIndex] = curData;
            }
          })

          node.value.properties = currentProperties;
        }
      }
    })
  }


  public appendAutoComponents (componentsProps: any) {
    this.initVueProps('components');

    traverse(this.pageAST, {
      ObjectProperty: (path) => {
        const { node } = path;
        if (node.key && node.key.name === 'components') {

          const currentProperties = node.value.properties;
          componentsProps.forEach((curData) => {
            const findIndex = currentProperties.findIndex(item => item.key.name ===curData.key.name);
            if (findIndex === -1) {
              currentProperties.push(curData);
            } else {
              currentProperties[findIndex] = curData;
            }
          })

          node.value.properties = currentProperties;
        }
      }
    })
  }

  public appendCreated (createdProp: any) {
    const propName = 'created';
    traverse(this.pageAST, {
      ObjectExpression: (path) => {
        if (path.parent.type === 'ExportDefaultDeclaration') {
          const {node} = path;
          let dataNode = node.properties.find(item => {
            return item.key && item.key.name === propName;
          });
          if (!dataNode) {
            node.properties.unshift(createdProp);
          }
        }
      },
    })
  }
}