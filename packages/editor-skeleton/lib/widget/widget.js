"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
exports.isWidget = isWidget;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));
var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));
var _react = require("react");
var _lowcodeEditorCore = require("@alilc/lowcode-editor-core");
var _lowcodeUtils = require("@alilc/lowcode-utils");
var _widgetViews = require("../components/widget-views");
var _dec, _dec2, _dec3, _class, _descriptor, _descriptor2, _descriptor3; // import { getEvent } from '@alilc/lowcode-shell';
var Widget = (_dec = _lowcodeEditorCore.obx.ref, _dec2 = _lowcodeEditorCore.obx.ref, _dec3 = _lowcodeEditorCore.obx.ref, (_class = /*#__PURE__*/function () {
  function Widget(skeleton, config) {
    this.skeleton = skeleton;
    this.config = config;
    this.isWidget = true;
    this.id = (0, _lowcodeUtils.uniqueId)('widget');
    this.name = void 0;
    this.align = void 0;
    (0, _initializerDefineProperty2["default"])(this, "_visible", _descriptor, this);
    (0, _initializerDefineProperty2["default"])(this, "inited", _descriptor2, this);
    (0, _initializerDefineProperty2["default"])(this, "_disabled", _descriptor3, this);
    this._body = void 0;
    this.title = void 0;
    (0, _lowcodeEditorCore.makeObservable)(this);
    var _config$props = config.props,
      props = _config$props === void 0 ? {} : _config$props,
      name = config.name;
    this.name = name;
    this.align = props.align;
    this.title = props.title || name;
    if (props.onInit) {
      props.onInit.call(this, this);
    }
  }
  var _proto = Widget.prototype;
  _proto.getId = function getId() {
    return this.id;
  };
  _proto.getName = function getName() {
    return this.name;
  };
  _proto.getContent = function getContent() {
    return this.content;
  };
  _proto.hide = function hide() {
    this.setVisible(false);
  };
  _proto.show = function show() {
    this.setVisible(true);
  };
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
  (0, _createClass2["default"])(Widget, [{
    key: "visible",
    get: function get() {
      return this._visible;
    }
  }, {
    key: "body",
    get: function get() {
      if (this.inited) {
        return this._body;
      }
      this.inited = true;
      var _this$config = this.config,
        content = _this$config.content,
        contentProps = _this$config.contentProps;
      this._body = (0, _lowcodeUtils.createContent)(content, (0, _extends2["default"])({}, contentProps, {
        config: this.config
        // editor: getEvent(this.skeleton.editor),
      }));

      return this._body;
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
    key: "disabled",
    get: function get() {
      return this._disabled;
    }
  }]);
  return Widget;
}(), (_descriptor = (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "_visible", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor2 = (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "inited", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3 = (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "_disabled", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
})), _class));
exports["default"] = Widget;
function isWidget(obj) {
  return obj && obj.isWidget;
}