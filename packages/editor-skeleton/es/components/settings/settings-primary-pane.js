import _Tab from "@alifd/next/lib/tab";
import _extends from "@babel/runtime/helpers/extends";
import _Breadcrumb from "@alifd/next/lib/breadcrumb";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";
var _dec, _class, _class2, _descriptor;
import _regeneratorRuntime from "@babel/runtime/regenerator";
import React, { Component } from 'react';
import { Title, observer, obx, globalContext, engineConfig, makeObservable } from '@alilc/lowcode-editor-core';
import { isSettingField } from '@alilc/lowcode-designer';
import classNames from 'classnames';
import { SettingsMain } from './main';
import { SettingsPane } from './settings-pane';
import { StageBox } from '../stage-box';
import { SkeletonContext } from '../../context';
import { createIcon } from '@alilc/lowcode-utils';
export var SettingsPrimaryPane = (_dec = obx.ref, observer(_class = (_class2 = /*#__PURE__*/function (_Component) {
  _inheritsLoose(SettingsPrimaryPane, _Component);
  function SettingsPrimaryPane(props) {
    var _this;
    _this = _Component.call(this, props) || this;
    _this.state = {
      shouldIgnoreRoot: false
    };
    _this.main = new SettingsMain(globalContext.get('editor'));
    _initializerDefineProperty(_this, "_activeKey", _descriptor, _assertThisInitialized(_this));
    makeObservable(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = SettingsPrimaryPane.prototype;
  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;
    this.setShouldIgnoreRoot();
    globalContext.get('editor').on('designer.selection.change', function () {
      if (!engineConfig.get('stayOnTheSameSettingTab', false)) {
        _this2._activeKey = null;
      }
    });
  };
  _proto.setShouldIgnoreRoot = /*#__PURE__*/function () {
    var _setShouldIgnoreRoot = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var designMode;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return globalContext.get('editor').get('designMode');
          case 2:
            designMode = _context.sent;
            this.setState({
              shouldIgnoreRoot: designMode === 'live'
            });
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    function setShouldIgnoreRoot() {
      return _setShouldIgnoreRoot.apply(this, arguments);
    }
    return setShouldIgnoreRoot;
  }();
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.main.purge();
  };
  _proto.renderBreadcrumb = function renderBreadcrumb() {
    var _designer$currentSele, _designer$currentSele2, _this$main$componentM;
    var settings = this.main.settings;
    var config = this.props.config;
    // const shouldIgnoreRoot = config.props?.ignoreRoot;
    var shouldIgnoreRoot = this.state.shouldIgnoreRoot;
    if (!settings) {
      return null;
    }
    if (settings.isMultiple) {
      var _settings$componentMe;
      return /*#__PURE__*/React.createElement("div", {
        className: "lc-settings-navigator"
      }, createIcon((_settings$componentMe = settings.componentMeta) === null || _settings$componentMe === void 0 ? void 0 : _settings$componentMe.icon, {
        className: 'lc-settings-navigator-icon',
        "class": 'lc-settings-navigator-icon'
      }), /*#__PURE__*/React.createElement(Title, {
        title: settings.componentMeta.title
      }), /*#__PURE__*/React.createElement("span", null, " x ", settings.nodes.length));
    }
    var editor = globalContext.get('editor');
    var designer = editor.get('designer');
    var current = designer === null || designer === void 0 ? void 0 : (_designer$currentSele = designer.currentSelection) === null || _designer$currentSele === void 0 ? void 0 : (_designer$currentSele2 = _designer$currentSele.getNodes()) === null || _designer$currentSele2 === void 0 ? void 0 : _designer$currentSele2[0];
    var node = settings.first;
    var focusNode = node.document.focusNode;
    var items = [];
    var l = 3;
    var _loop = function _loop() {
      var _node = node;
      // dirty code: should remove
      if (shouldIgnoreRoot && node.isRoot()) {
        return "break";
      }
      if (node.contains(focusNode)) {
        l = 0;
      }
      var props = l === 2 ? {} : {
        onMouseOver: hoverNode.bind(null, _node, true),
        onMouseOut: hoverNode.bind(null, _node, false),
        onClick: function onClick() {
          if (!_node) {
            return;
          }
          selectNode.call(null, _node);
          var getName = function getName(node) {
            var _node$componentMeta, _node$componentMeta2;
            var npm = node === null || node === void 0 ? void 0 : (_node$componentMeta = node.componentMeta) === null || _node$componentMeta === void 0 ? void 0 : _node$componentMeta.npm;
            return [npm === null || npm === void 0 ? void 0 : npm["package"], npm === null || npm === void 0 ? void 0 : npm.componentName].filter(function (item) {
              return !!item;
            }).join('-') || (node === null || node === void 0 ? void 0 : (_node$componentMeta2 = node.componentMeta) === null || _node$componentMeta2 === void 0 ? void 0 : _node$componentMeta2.componentName) || '';
          };
          var selected = getName(current);
          var target = getName(_node);
          editor === null || editor === void 0 ? void 0 : editor.emit('skeleton.settingsPane.Breadcrumb', {
            selected: selected,
            target: target
          });
        }
      };
      items.unshift( /*#__PURE__*/React.createElement(_Breadcrumb.Item, _extends({}, props, {
        key: node.id
      }), /*#__PURE__*/React.createElement(Title, {
        title: node.title
      })));
      node = node.parent;
    };
    while (l-- > 0 && node) {
      var _ret = _loop();
      if (_ret === "break") break;
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "lc-settings-navigator"
    }, createIcon((_this$main$componentM = this.main.componentMeta) === null || _this$main$componentM === void 0 ? void 0 : _this$main$componentM.icon, {
      className: 'lc-settings-navigator-icon',
      "class": 'lc-settings-navigator-icon'
    }), /*#__PURE__*/React.createElement(_Breadcrumb, {
      className: "lc-settings-node-breadcrumb"
    }, items));
  };
  _proto.render = function render() {
    var _this3 = this;
    var settings = this.main.settings;
    var editor = globalContext.get('editor');
    if (!settings) {
      // 未选中节点，提示选中 或者 显示根节点设置
      return /*#__PURE__*/React.createElement("div", {
        className: "lc-settings-main"
      }, /*#__PURE__*/React.createElement("div", {
        className: "lc-settings-notice"
      }, /*#__PURE__*/React.createElement("p", null, "\u8BF7\u5728\u5DE6\u4FA7\u753B\u5E03\u9009\u4E2D\u8282\u70B9")));
    }

    // 当节点被锁定，且未开启锁定后容器可设置属性
    if (settings.isLocked && !engineConfig.get('enableLockedNodeSetting', false)) {
      return /*#__PURE__*/React.createElement("div", {
        className: "lc-settings-main"
      }, /*#__PURE__*/React.createElement("div", {
        className: "lc-settings-notice"
      }, /*#__PURE__*/React.createElement("p", null, "\u8BE5\u8282\u70B9\u5DF2\u88AB\u9501\u5B9A\uFF0C\u65E0\u6CD5\u914D\u7F6E")));
    }
    if (Array.isArray(settings.items) && settings.items.length === 0) {
      return /*#__PURE__*/React.createElement("div", {
        className: "lc-settings-main"
      }, /*#__PURE__*/React.createElement("div", {
        className: "lc-settings-notice"
      }, /*#__PURE__*/React.createElement("p", null, "\u8BE5\u7EC4\u4EF6\u6682\u65E0\u914D\u7F6E")));
    }
    if (!settings.isSameComponent) {
      // TODO: future support 获取设置项交集编辑
      return /*#__PURE__*/React.createElement("div", {
        className: "lc-settings-main"
      }, /*#__PURE__*/React.createElement("div", {
        className: "lc-settings-notice"
      }, /*#__PURE__*/React.createElement("p", null, "\u8BF7\u9009\u4E2D\u540C\u4E00\u7C7B\u578B\u8282\u70B9\u7F16\u8F91")));
    }
    var items = settings.items;
    if (items.length > 5 || items.some(function (item) {
      return !isSettingField(item) || !item.isGroup;
    })) {
      return /*#__PURE__*/React.createElement("div", {
        className: "lc-settings-main"
      }, this.renderBreadcrumb(), /*#__PURE__*/React.createElement("div", {
        className: "lc-settings-body"
      }, /*#__PURE__*/React.createElement(SkeletonContext.Consumer, null, function (skeleton) {
        if (skeleton) {
          return /*#__PURE__*/React.createElement(StageBox, {
            skeleton: skeleton,
            target: settings,
            key: settings.id
          }, /*#__PURE__*/React.createElement(SettingsPane, {
            target: settings,
            usePopup: false
          }));
        }
        return null;
      })));
    }
    var matched = false;
    var tabs = items.map(function (field) {
      if (_this3._activeKey === field.name) {
        matched = true;
      }
      return /*#__PURE__*/React.createElement(_Tab.Item, {
        className: "lc-settings-tab-item",
        title: /*#__PURE__*/React.createElement(Title, {
          title: field.title
        }),
        key: field.name,
        onClick: function onClick() {
          editor === null || editor === void 0 ? void 0 : editor.emit('skeleton.settingsPane.change', {
            name: field.name,
            title: field.title
          });
        }
      }, /*#__PURE__*/React.createElement(SkeletonContext.Consumer, null, function (skeleton) {
        if (skeleton) {
          return /*#__PURE__*/React.createElement(StageBox, {
            skeleton: skeleton,
            target: field,
            key: field.id
          }, /*#__PURE__*/React.createElement(SettingsPane, {
            target: field,
            key: field.id,
            usePopup: false
          }));
        }
        return null;
      }));
    });
    var activeKey = matched ? this._activeKey : items[0].name;
    var className = classNames('lc-settings-main', {
      'lc-settings-hide-tabs': items.length === 1 && engineConfig.get('hideSettingsTabsWhenOnlyOneItem', false)
    });
    return /*#__PURE__*/React.createElement("div", {
      className: className
    }, this.renderBreadcrumb(), /*#__PURE__*/React.createElement(_Tab, {
      activeKey: activeKey,
      onChange: function onChange(tabKey) {
        _this3._activeKey = tabKey;
      },
      navClassName: "lc-settings-tabs",
      animation: false,
      excessMode: "dropdown",
      contentClassName: "lc-settings-tabs-content"
    }, tabs));
  };
  return SettingsPrimaryPane;
}(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_activeKey", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
function hoverNode(node, flag) {
  node.hover(flag);
}
function selectNode(node) {
  node === null || node === void 0 ? void 0 : node.select();
}