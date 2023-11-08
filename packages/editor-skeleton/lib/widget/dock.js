"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));
var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));
var _react = require("react");
var _lowcodeEditorCore = require("@alilc/lowcode-editor-core");
var _lowcodeUtils = require("@alilc/lowcode-utils");
var _widgetViews = require("../components/widget-views");
var _dec, _dec2, _class, _descriptor, _descriptor2; // import { getEvent } from '@alilc/lowcode-shell';
/**
 * 带图标（主要）/标题（次要）的扩展
 */
var Dock = (_dec = _lowcodeEditorCore.obx.ref, _dec2 = _lowcodeEditorCore.obx.ref, (_class = /*#__PURE__*/function () {
  function Dock(skeleton, config) {
    this.skeleton = skeleton;
    this.config = config;
    this.isWidget = true;
    this.id = (0, _lowcodeUtils.uniqueId)('dock');
    this.name = void 0;
    this.align = void 0;
    (0, _initializerDefineProperty2["default"])(this, "_visible", _descriptor, this);
    (0, _initializerDefineProperty2["default"])(this, "_disabled", _descriptor2, this);
    this.inited = false;
    this._body = void 0;
    (0, _lowcodeEditorCore.makeObservable)(this);
    var _config$props = config.props,
      props = _config$props === void 0 ? {} : _config$props,
      name = config.name;
    this.name = name;
    this.align = props.align;
    if (props.onInit) {
      props.onInit.call(this, this);
    }
  }
  var _proto = Dock.prototype;
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
  _proto.getContent = function getContent() {
    return this.content;
  };
  _proto.getName = function getName() {
    return this.name;
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
  (0, _createClass2["default"])(Dock, [{
    key: "visible",
    get: function get() {
      return this._visible;
    }
  }, {
    key: "content",
    get: function get() {
      return /*#__PURE__*/(0, _react.createElement)(_widgetViews.WidgetView, {
        widget: this,
        key: this.id
      });
    }
  }, {
    key: "body",
    get: function get() {
      if (this.inited) {
        return this._body;
      }
      var _this$config = this.config,
        props = _this$config.props,
        content = _this$config.content,
        contentProps = _this$config.contentProps;
      if (content) {
        this._body = (0, _lowcodeUtils.createContent)(content, (0, _extends2["default"])({}, contentProps, {
          config: this.config
          // editor: getEvent(this.skeleton.editor),
        }));
      } else {
        this._body = /*#__PURE__*/(0, _react.createElement)(_widgetViews.DockView, props);
      }
      this.inited = true;
      return this._body;
    }
  }, {
    key: "disabled",
    get: function get() {
      return this._disabled;
    }
  }]);
  return Dock;
}(), (_descriptor = (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "_visible", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor2 = (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "_disabled", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
})), _class));
exports["default"] = Dock;