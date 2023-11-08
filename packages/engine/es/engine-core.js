import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { createElement } from 'react';
import { render } from 'react-dom';
import { Skeleton as InnerSkeleton } from '@firefly/auto-editor-skeleton';
import { Designer, AutoCodePluginManager } from '@firefly/auto-designer';
import { Editor, globalContext } from '@firefly/auto-editor-core';
import getSkeletonCabin from './modules/skeleton-cabin';
import DesignerPlugin from '@firefly/auto-plugin-designer';
import { IconChatgpt } from './IconChatgpt';
import ChatgptPane from '@firefly/auto-plugin-chatgpt';
import PromptPanel from '@firefly/auto-plugin-prompt';
import { IconPrompt } from './IconPrompt';
import { IconSetting } from './IconSetting';
import SystemSettingPane from '@firefly/auto-plugin-system-setting';
var editor = new Editor();
globalContext.register(editor, Editor);
globalContext.register(editor, 'editor');
var designer = new Designer({
  editor: editor
});
editor.set('designer', designer);
var innerSkeleton = new InnerSkeleton(editor);
var skeletonCabin = getSkeletonCabin(innerSkeleton);
var Workbench = skeletonCabin.Workbench;
editor.set('skeleton', innerSkeleton);
var plugins = new AutoCodePluginManager(editor).toProxy();
var engineInited = false;
(function () {
  var _registerPlugins = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
    var defaultPanelRegistry, chatGPTPanelRegistry, promptPanelRegistry, SystemSettingRegistry, editorInit;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          // const locatorRegistry = (ctx: ILowCodePluginContext) => {
          //   return {
          //     init() {
          //       LocatorPlugin(ctx);
          //     },
          //   };
          // };
          // locatorRegistry.pluginName = '__locator__';
          // await plugins.register(locatorRegistry);
          defaultPanelRegistry = function defaultPanelRegistry(ctx) {
            return {
              init: function init() {
                innerSkeleton.add({
                  area: 'mainArea',
                  name: 'designer',
                  type: 'Widget',
                  content: DesignerPlugin
                });

                // innerSkeleton.add({
                //   area: 'leftArea',
                //   name: 'outlinePane',
                //   type: 'PanelDock',
                //   content: {
                //     name: 'outline-pane',
                //     props: {
                //       icon: IconOutline,
                //       description: null,
                //     },
                //     content: OutlinePane,
                //   },
                //   panelProps: {
                //     area: 'leftFloatArea',
                //     keepVisibleWhileDragging: true,
                //   },
                // });
              }
            };
          };

          defaultPanelRegistry.pluginName = '___default_panel___';
          _context2.next = 4;
          return plugins.register(defaultPanelRegistry);
        case 4:
          // 组件面板
          // const componentPanelRegistry = (ctx: ILowCodePluginContext) => {
          //   return {
          //     init() {
          //       innerSkeleton.add({
          //           area: 'leftArea',
          //           type: 'PanelDock',
          //           name: 'componentsPane',
          //           content: {
          //             name: 'component-pane',
          //             props: {
          //               icon: IconOutline,
          //               description: null,
          //               editor,
          //             },
          //             content: ComponentPane,
          //           },
          //           contentProps: {
          //             editor,
          //           },
          //           panelProps: {
          //             area: 'leftFloatArea',
          //             keepVisibleWhileDragging: true,
          //           },
          //         });
          //     },
          //   };
          // };
          // componentPanelRegistry.pluginName = '___component_panel___';
          // await plugins.register(componentPanelRegistry);
          // chatGPT面板
          chatGPTPanelRegistry = function chatGPTPanelRegistry(ctx) {
            return {
              init: function init() {
                innerSkeleton.add({
                  area: 'leftArea',
                  type: 'PanelDock',
                  name: 'chatgptPane',
                  content: {
                    name: 'chatgpt-pane',
                    props: {
                      icon: IconChatgpt,
                      description: null,
                      editor: editor
                    },
                    content: ChatgptPane
                  },
                  contentProps: {
                    editor: editor
                  },
                  panelProps: {
                    area: 'leftFixedArea',
                    keepVisibleWhileDragging: true
                  }
                });
              }
            };
          };
          chatGPTPanelRegistry.pluginName = '___chatgpt_panel___';
          _context2.next = 8;
          return plugins.register(chatGPTPanelRegistry);
        case 8:
          // prompt 面板
          promptPanelRegistry = function promptPanelRegistry(ctx) {
            return {
              init: function init() {
                innerSkeleton.add({
                  area: 'leftArea',
                  type: 'PanelDock',
                  name: 'PromptPanel',
                  content: {
                    name: 'prompt-panel',
                    props: {
                      icon: IconPrompt,
                      description: null,
                      editor: editor
                    },
                    content: PromptPanel
                  },
                  contentProps: {
                    editor: editor
                  },
                  panelProps: {
                    area: 'leftFixedArea',
                    keepVisibleWhileDragging: true
                  }
                });
              }
            };
          };
          promptPanelRegistry.pluginName = '___prompt_panel___';
          _context2.next = 12;
          return plugins.register(promptPanelRegistry);
        case 12:
          // 设置面板
          SystemSettingRegistry = function SystemSettingRegistry(ctx) {
            return {
              init: function init() {
                innerSkeleton.add({
                  area: 'leftArea',
                  type: 'PanelDock',
                  name: 'SystemSettingPanel',
                  content: {
                    name: 'system-setting-panel',
                    props: {
                      icon: IconSetting,
                      description: null,
                      editor: editor,
                      align: 'bottom'
                    },
                    content: SystemSettingPane
                  },
                  contentProps: {
                    editor: editor
                  },
                  panelProps: {
                    area: 'leftFixedArea',
                    keepVisibleWhileDragging: true
                  }
                });
              }
            };
          };
          SystemSettingRegistry.pluginName = '___system-setting_panel___';
          _context2.next = 16;
          return plugins.register(SystemSettingRegistry);
        case 16:
          editorInit = function editorInit(ctx) {
            return {
              name: 'editor-init',
              init: function init() {
                return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
                  var project;
                  return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        // 修改面包屑组件的分隔符属性setter
                        // const assets = await (
                        //   await fetch(
                        //     `https://alifd.alicdn.com/npm/@alilc/lowcode-materials/build/lowcode/assets-prod.json`
                        //   )
                        // ).json();
                        // 设置物料描述
                        project = ctx.project; // 加载 schema
                        project.open();
                      case 2:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }))();
              }
            };
          };
          editorInit.pluginName = 'editorInit';
          _context2.next = 20;
          return plugins.register(editorInit);
        case 20:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  function registerPlugins() {
    return _registerPlugins.apply(this, arguments);
  }
  return registerPlugins;
})()();
export function init(_x, _x2, _x3) {
  return _init.apply(this, arguments);
}
function _init() {
  _init = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(container, options, pluginPreference) {
    var engineOptions, engineContainer;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (!engineInited) {
            _context3.next = 2;
            break;
          }
          return _context3.abrupt("return");
        case 2:
          engineInited = true;
          engineOptions = options;
          engineContainer = container || document.createElement('div');
          _context3.next = 7;
          return plugins.init(pluginPreference);
        case 7:
          render( /*#__PURE__*/createElement(Workbench, {
            skeleton: innerSkeleton,
            className: 'engine-main',
            topAreaItemClassName: 'engine-actionitem'
          }), engineContainer);
          console.log('auto engine core init');
        case 9:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _init.apply(this, arguments);
}