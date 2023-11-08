"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
exports.isPanelDock = isPanelDock;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));
var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));
var _lowcodeEditorCore = require("@alilc/lowcode-editor-core");
var _lowcodeUtils = require("@alilc/lowcode-utils");
var _react = require("react");
var _widgetViews = require("../components/widget-views");
var _utils = require("./utils");
var _reactDom = require("react-dom");
var _dec, _dec2, _class, _descriptor, _descriptor2;
var PanelDock = (_dec = _lowcodeEditorCore.obx.ref, _dec2 = _lowcodeEditorCore.obx.ref, (_class = /*#__PURE__*/function () {
  var _proto = PanelDock.prototype;
  _proto.getDOMNode = function getDOMNode() {
    // eslint-disable-next-line react/no-find-dom-node
    return this._shell ? (0, _reactDom.findDOMNode)(this._shell) : null;
  };
  function PanelDock(skeleton, config) {
    this.skeleton = skeleton;
    this.config = config;
    this.isWidget = true;
    this.isPanelDock = true;
    this.id = void 0;
    this.name = void 0;
    this.align = void 0;
    this.inited = false;
    this._body = void 0;
    this._shell = null;
    (0, _initializerDefineProperty2["default"])(this, "_visible", _descriptor, this);
    this.panelName = void 0;
    this._panel = void 0;
    (0, _initializerDefineProperty2["default"])(this, "_disabled", _descriptor2, this);
    (0, _lowcodeEditorCore.makeObservable)(this);
    var content = config.content,
      contentProps = config.contentProps,
      panelProps = config.panelProps,
      name = config.name,
      props = config.props;
    this.name = name;
    this.id = (0, _lowcodeUtils.uniqueId)("dock:" + name + "$");
    this.panelName = config.panelName || name;
    this.align = props === null || props === void 0 ? void 0 : props.align;
    if (content) {
      var _panelProps = (0, _extends2["default"])({}, panelProps);
      if (_panelProps.title == null && props) {
        _panelProps.title = (0, _utils.composeTitle)(props.title, undefined, props.description, true, true);
      }
      this._panel = this.skeleton.add({
        type: 'Panel',
        name: this.panelName,
        props: _panelProps,
        contentProps: contentProps,
        content: content,
        area: panelProps === null || panelProps === void 0 ? void 0 : panelProps.area
      });
    }
    if (props !== null && props !== void 0 && props.onInit) {
      props.onInit.call(this, this);
    }
  }
  _proto.setVisible = function setVisible(flag) {
    if (flag === this._visible) {
      return;
    }
    if (flag) {
      this._visible = true;
    } else if (this.inited) {
      this._visible = false;
    }
  };
  _proto.hide = function hide() {
    this.setVisible(false);
  };
  _proto.show = function show() {
    this.setVisible(true);
  };
  _proto.toggle = function toggle() {
    this.setVisible(!this._visible);
  };
  _proto.setDisabled = function setDisabled(flag) {
    if (this._disabled === flag) return;
    this._disabled = flag;
  };
  _proto.disable = function disable() {
    this.setDisabled(true);
  };
  _proto.enable = function enable() {
    this.setDisabled(false);
  };
  _proto.togglePanel = function togglePanel() {
    var _this$panel;
    (_this$panel = this.panel) === null || _this$panel === void 0 ? void 0 : _this$panel.toggle();
  };
  _proto.getName = function getName() {
    return this.name;
  };
  _proto.getContent = function getContent() {
    return this.content;
  };
  _proto.hidePanel = function hidePanel() {
    var _this$panel2;
    (_this$panel2 = this.panel) === null || _this$panel2 === void 0 ? void 0 : _this$panel2.setActive(false);
  };
  _proto.showPanel = function showPanel() {
    var _this$panel3;
    (_this$panel3 = this.panel) === null || _this$panel3 === void 0 ? void 0 : _this$panel3.setActive(true);
  }

  /**
   * @deprecated
   */;
  _proto.onActiveChange = function onActiveChange(func) {
    var _this$panel4;
    return (_this$panel4 = this.panel) === null || _this$panel4 === void 0 ? void 0 : _this$panel4.onActiveChange(func);
  };
  (0, _createClass2["default"])(PanelDock, [{
    key: "body",
    get: function get() {
      if (this.inited) {
        return this._body;
      }
      this.inited = true;
      var props = this.config.props;
      this._body = /*#__PURE__*/(0, _react.createElement)(_widgetViews.PanelDockView, (0, _extends2["default"])({}, props, {
        dock: this
      }));
      return this._body;
    }
  }, {
    key: "content",
    get: function get() {
      var _this = this;
      return /*#__PURE__*/(0, _react.createElement)(_widgetViews.WidgetView, {
        widget: this,
        ref: function ref(_ref) {
          _this._shell = _ref;
        },
        key: this.id
      });
    }
  }, {
    key: "visible",
    get: function get() {
      return this._visible;
    }
  }, {
    key: "actived",
    get: function get() {
      var _this$panel5;
      return ((_this$panel5 = this.panel) === null || _this$panel5 === void 0 ? void 0 : _this$panel5.visible) || false;
    }
  }, {
    key: "panel",
    get: function get() {
      return this._panel || this.skeleton.getPanel(this.panelName);
    }
  }, {
    key: "disabled",
    get: function get() {
      return this._disabled;
    }
  }]);
  return PanelDock;
}(), (_descriptor = (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "_visible", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "actived", [_lowcodeEditorCore.computed], Object.getOwnPropertyDescriptor(_class.prototype, "actived"), _class.prototype), _descriptor2 = (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "_disabled", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "panel", [_lowcodeEditorCore.computed], Object.getOwnPropertyDescriptor(_class.prototype, "panel"), _class.prototype)), _class));
exports["default"] = PanelDock;
function isPanelDock(obj) {
  return obj && obj.isPanelDock;
}