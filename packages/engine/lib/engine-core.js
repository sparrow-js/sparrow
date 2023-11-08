"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.init = init;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _react = require("react");
var _reactDom = require("react-dom");
var _autoEditorSkeleton = require("@firefly/auto-editor-skeleton");
var _autoDesigner = require("@firefly/auto-designer");
var _autoEditorCore = require("@firefly/auto-editor-core");
var _skeletonCabin = _interopRequireDefault(require("./modules/skeleton-cabin"));
var _autoPluginDesigner = _interopRequireDefault(require("@firefly/auto-plugin-designer"));
var _IconChatgpt = require("./IconChatgpt");
var _autoPluginChatgpt = _interopRequireDefault(require("@firefly/auto-plugin-chatgpt"));
var _autoPluginPrompt = _interopRequireDefault(require("@firefly/auto-plugin-prompt"));
var _IconPrompt = require("./IconPrompt");
var _IconSetting = require("./IconSetting");
var _autoPluginSystemSetting = _interopRequireDefault(require("@firefly/auto-plugin-system-setting"));
var editor = new _autoEditorCore.Editor();
_autoEditorCore.globalContext.register(editor, _autoEditorCore.Editor);
_autoEditorCore.globalContext.register(editor, 'editor');
var designer = new _autoDesigner.Designer({
  editor: editor
});
editor.set('designer', designer);
var innerSkeleton = new _autoEditorSkeleton.Skeleton(editor);
var skeletonCabin = (0, _skeletonCabin["default"])(innerSkeleton);
var Workbench = skeletonCabin.Workbench;
editor.set('skeleton', innerSkeleton);
var plugins = new _autoDesigner.AutoCodePluginManager(editor).toProxy();
var engineInited = false;
(function () {
  var _registerPlugins = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var defaultPanelRegistry, chatGPTPanelRegistry, promptPanelRegistry, SystemSettingRegistry, editorInit;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
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
                  content: _autoPluginDesigner["default"]
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
                      icon: _IconChatgpt.IconChatgpt,
                      description: null,
                      editor: editor
                    },
                    content: _autoPluginChatgpt["default"]
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
                      icon: _IconPrompt.IconPrompt,
                      description: null,
                      editor: editor
                    },
                    content: _autoPluginPrompt["default"]
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
                      icon: _IconSetting.IconSetting,
                      description: null,
                      editor: editor,
                      align: 'bottom'
                    },
                    content: _autoPluginSystemSetting["default"]
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
                return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
                  var project;
                  return _regenerator["default"].wrap(function _callee$(_context) {
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
function init(_x, _x2, _x3) {
  return _init.apply(this, arguments);
}
function _init() {
  _init = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(container, options, pluginPreference) {
    var engineOptions, engineContainer;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
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
          (0, _reactDom.render)( /*#__PURE__*/(0, _react.createElement)(Workbench, {
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